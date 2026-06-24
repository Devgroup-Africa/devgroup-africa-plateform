import { Router } from 'express'
import { ActivityLog } from '../models/ActivityLog.js'
import { AdminAlert } from '../models/AdminAlert.js'
import { CatalogItem } from '../models/CatalogItem.js'
import { CommunicationItem } from '../models/CommunicationItem.js'
import { ContactMessage } from '../models/ContactMessage.js'
import { MediaItem } from '../models/MediaItem.js'
import { PageContent } from '../models/PageContent.js'
import { Post } from '../models/Post.js'
import { Project } from '../models/Project.js'
import { User } from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const adminRouter = Router()

const resources = {
  pages: PageContent,
  catalog: CatalogItem,
  projects: Project,
  posts: Post,
  contacts: ContactMessage,
  communication: CommunicationItem,
  media: MediaItem,
  users: User,
}

function getItemTitle(item) {
  return item?.title || item?.name || item?.email || item?.key || String(item?._id || 'Element')
}

async function writeActivity({ action, resource, item, actorEmail }) {
  await ActivityLog.create({
    action,
    resource,
    resourceId: item?._id,
    title: getItemTitle(item),
    details: `${resource} ${action}`,
    actorEmail: actorEmail || '',
  })
}

async function syncAdminAlerts() {
  const [draftProjects, draftCatalog, postsWithoutImage, unreadContacts] = await Promise.all([
    Project.countDocuments({ status: 'draft' }),
    CatalogItem.countDocuments({ status: 'draft' }),
    Post.countDocuments({ $or: [{ coverImage: '' }, { coverImage: { $exists: false } }] }),
    ContactMessage.countDocuments({ status: 'new' }),
  ])

  const alerts = [
    { key: 'draft-projects', title: `${draftProjects} projet(s) en brouillon`, details: 'Projets a finaliser avant publication.', priority: 'info', severity: 'info', resource: 'projects', count: draftProjects },
    { key: 'draft-catalog', title: `${draftCatalog} service(s)/solution(s) en brouillon`, details: 'Elements du catalogue a valider.', priority: 'info', severity: 'info', resource: 'catalog', count: draftCatalog },
    { key: 'posts-without-image', title: `${postsWithoutImage} article(s) sans image`, details: 'Articles sans image de couverture.', priority: 'medium', severity: 'warning', resource: 'posts', count: postsWithoutImage },
    { key: 'unread-contacts', title: `${unreadContacts} message(s) contact non lu(s)`, details: 'Demandes entrantes a traiter.', priority: 'medium', severity: 'warning', resource: 'contacts', count: unreadContacts },
  ]

  await Promise.all(alerts.map(alert => AdminAlert.updateOne(
    { key: alert.key },
    { $set: { ...alert, status: alert.count > 0 ? 'active' : 'resolved' } },
    { upsert: true, runValidators: true },
  )))

  return AdminAlert.find().sort({ severity: 1, updatedAt: -1 }).lean()
}

adminRouter.get('/dashboard', asyncHandler(async (req, res) => {
  const [pages, catalog, projects, posts, contacts, communication, media, users, activity, alerts] = await Promise.all([
    PageContent.countDocuments(),
    CatalogItem.countDocuments(),
    Project.countDocuments(),
    Post.countDocuments(),
    ContactMessage.countDocuments(),
    CommunicationItem.countDocuments(),
    MediaItem.countDocuments(),
    User.countDocuments(),
    ActivityLog.countDocuments(),
    AdminAlert.countDocuments(),
  ])

  res.json({ pages, catalog, projects, posts, contacts, communication, media, users, activity, alerts })
}))

adminRouter.get('/activity', asyncHandler(async (req, res) => {
  const items = await ActivityLog.find().sort({ createdAt: -1 }).limit(50).lean()
  res.json(items)
}))

adminRouter.get('/alerts', asyncHandler(async (req, res) => {
  const items = await syncAdminAlerts()
  res.json(items)
}))

adminRouter.get('/:resource', asyncHandler(async (req, res) => {
  const Model = resources[req.params.resource]
  if (!Model) return res.status(404).json({ message: 'Unknown resource' })
  const query = Model.find().sort({ updatedAt: -1 })
  if (req.params.resource === 'users') {
    query.select('-passwordHash -passwordSalt')
  }
  const items = await query.lean()
  res.json(items)
}))

adminRouter.post('/:resource', asyncHandler(async (req, res) => {
  const Model = resources[req.params.resource]
  if (!Model) return res.status(404).json({ message: 'Unknown resource' })
  const item = await Model.create(req.body)
  await writeActivity({ action: 'created', resource: req.params.resource, item, actorEmail: req.user?.email })
  if (req.params.resource === 'users') {
    const user = await User.findById(item._id).select('-passwordHash -passwordSalt').lean()
    return res.status(201).json(user)
  }
  res.status(201).json(item)
}))

adminRouter.put('/:resource/:id', asyncHandler(async (req, res) => {
  const Model = resources[req.params.resource]
  if (!Model) return res.status(404).json({ message: 'Unknown resource' })
  if (req.params.resource === 'users' && req.body.password) {
    const user = await User.findById(req.params.id).select('+passwordHash +passwordSalt')
    if (!user) return res.status(404).json({ message: 'Item not found' })
    Object.assign(user, req.body)
    await user.save()
    await writeActivity({ action: 'updated', resource: req.params.resource, item: user, actorEmail: req.user?.email })
    const sanitized = await User.findById(user._id).select('-passwordHash -passwordSalt').lean()
    return res.json(sanitized)
  }
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!item) return res.status(404).json({ message: 'Item not found' })
  await writeActivity({ action: 'updated', resource: req.params.resource, item, actorEmail: req.user?.email })
  if (req.params.resource === 'users') {
    const user = await User.findById(item._id).select('-passwordHash -passwordSalt').lean()
    return res.json(user)
  }
  res.json(item)
}))

adminRouter.delete('/:resource/:id', asyncHandler(async (req, res) => {
  const Model = resources[req.params.resource]
  if (!Model) return res.status(404).json({ message: 'Unknown resource' })
  const item = await Model.findByIdAndDelete(req.params.id)
  if (!item) return res.status(404).json({ message: 'Item not found' })
  await writeActivity({ action: 'deleted', resource: req.params.resource, item, actorEmail: req.user?.email })
  res.status(204).end()
}))
