import mongoose from 'mongoose'
import { env } from '../config/env.js'
import { connectDatabase } from '../config/database.js'
import { ActivityLog } from '../models/ActivityLog.js'
import { AdminAlert } from '../models/AdminAlert.js'
import { CatalogItem } from '../models/CatalogItem.js'
import { ContactMessage } from '../models/ContactMessage.js'
import { MediaItem } from '../models/MediaItem.js'
import { PageContent } from '../models/PageContent.js'
import { Post } from '../models/Post.js'
import { Project } from '../models/Project.js'
import { User } from '../models/User.js'
import { catalogItems, homePage, posts, projects } from './data.js'

async function upsertMany(Model, items, uniqueKeys) {
  for (const item of items) {
    const filter = Object.fromEntries(uniqueKeys.map(key => [key, item[key]]))
    await Model.updateOne(filter, { $set: item }, { upsert: true, runValidators: true })
  }
}

async function seed() {
  await connectDatabase()

  await PageContent.updateOne({ key: homePage.key }, { $set: homePage }, { upsert: true, runValidators: true })
  await upsertMany(CatalogItem, catalogItems, ['type', 'slug'])
  await upsertMany(Project, projects, ['slug'])
  await upsertMany(Post, posts, ['slug'])

  if (env.adminEmail && env.adminPassword) {
    const existingUser = await User.findOne({ email: env.adminEmail })
    if (!existingUser) {
      await User.create({
        name: 'Administrateur DevGroup',
        email: env.adminEmail,
        role: 'admin',
        scope: 'Administration',
        status: 'active',
        password: env.adminPassword,
      })
    }
  }

  await upsertMany(MediaItem, [
    { title: 'Hero equipe', url: '/images/heroes/team.jpg', type: 'image', alt: 'Equipe DevGroup Africa', source: 'seed', status: 'published' },
    { title: 'Hero technologie', url: '/images/heroes/technology.jpg', type: 'image', alt: 'Technologie DevGroup Africa', source: 'seed', status: 'published' },
    { title: 'Hero produit', url: '/images/heroes/product.jpg', type: 'image', alt: 'Produit numerique DevGroup Africa', source: 'seed', status: 'published' },
  ], ['url'])

  if (await ActivityLog.countDocuments() === 0) {
    const [recentProjects, recentCatalog, recentPosts] = await Promise.all([
      Project.find().sort({ updatedAt: -1 }).limit(3).lean(),
      CatalogItem.find().sort({ updatedAt: -1 }).limit(3).lean(),
      Post.find().sort({ updatedAt: -1 }).limit(3).lean(),
    ])
    await ActivityLog.insertMany([
      ...recentProjects.map(item => ({ action: 'seed', resource: 'projects', resourceId: item._id, title: item.title, details: item.type || '', actorEmail: env.adminEmail })),
      ...recentCatalog.map(item => ({ action: 'seed', resource: 'catalog', resourceId: item._id, title: item.title, details: item.type || '', actorEmail: env.adminEmail })),
      ...recentPosts.map(item => ({ action: 'seed', resource: 'posts', resourceId: item._id, title: item.title, details: item.category || '', actorEmail: env.adminEmail })),
    ])
  }

  const [draftProjects, draftCatalog, postsWithoutImage, unreadContacts] = await Promise.all([
    Project.countDocuments({ status: 'draft' }),
    CatalogItem.countDocuments({ status: 'draft' }),
    Post.countDocuments({ $or: [{ coverImage: '' }, { coverImage: { $exists: false } }] }),
    ContactMessage.countDocuments({ status: 'new' }),
  ])
  await upsertMany(AdminAlert, [
    { key: 'draft-projects', title: `${draftProjects} projet(s) en brouillon`, details: 'Projets a finaliser avant publication.', priority: 'info', severity: 'info', resource: 'projects', count: draftProjects, status: draftProjects > 0 ? 'active' : 'resolved' },
    { key: 'draft-catalog', title: `${draftCatalog} service(s)/solution(s) en brouillon`, details: 'Elements du catalogue a valider.', priority: 'info', severity: 'info', resource: 'catalog', count: draftCatalog, status: draftCatalog > 0 ? 'active' : 'resolved' },
    { key: 'posts-without-image', title: `${postsWithoutImage} article(s) sans image`, details: 'Articles sans image de couverture.', priority: 'medium', severity: 'warning', resource: 'posts', count: postsWithoutImage, status: postsWithoutImage > 0 ? 'active' : 'resolved' },
    { key: 'unread-contacts', title: `${unreadContacts} message(s) contact non lu(s)`, details: 'Demandes entrantes a traiter.', priority: 'medium', severity: 'warning', resource: 'contacts', count: unreadContacts, status: unreadContacts > 0 ? 'active' : 'resolved' },
  ], ['key'])

  console.log('Seed completed.')
}

seed()
  .catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
