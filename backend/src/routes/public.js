import { Router } from 'express'
import { CatalogItem } from '../models/CatalogItem.js'
import { ContactMessage } from '../models/ContactMessage.js'
import { PageContent } from '../models/PageContent.js'
import { Post } from '../models/Post.js'
import { Project } from '../models/Project.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const publicRouter = Router()

const published = { status: 'published' }

publicRouter.get('/home', asyncHandler(async (req, res) => {
  const [page, services, projects, posts] = await Promise.all([
    PageContent.findOne({ key: 'home', ...published }).lean(),
    CatalogItem.find({ type: 'service', ...published }).sort({ order: 1, title: 1 }).lean(),
    Project.find(published).sort({ order: 1, createdAt: -1 }).lean(),
    Post.find(published).sort({ publishedAt: -1 }).limit(6).lean(),
  ])

  res.json({ page, services, projects, posts })
}))

publicRouter.get('/catalog/:type', asyncHandler(async (req, res) => {
  const dbType = req.params.type === 'solutions' ? 'solution' : 'service'
  const items = await CatalogItem.find({ type: dbType, ...published }).sort({ order: 1, title: 1 }).lean()
  res.json(items)
}))

publicRouter.get('/catalog/:type/:slug', asyncHandler(async (req, res) => {
  const dbType = req.params.type === 'solutions' ? 'solution' : 'service'
  const item = await CatalogItem.findOne({ type: dbType, slug: req.params.slug, ...published }).lean()
  if (!item) return res.status(404).json({ message: 'Catalog item not found' })
  res.json(item)
}))

publicRouter.get('/projects', asyncHandler(async (req, res) => {
  const projects = await Project.find(published).sort({ order: 1, createdAt: -1 }).lean()
  res.json(projects)
}))

publicRouter.get('/posts', asyncHandler(async (req, res) => {
  const posts = await Post.find(published).sort({ publishedAt: -1 }).lean()
  res.json(posts)
}))

publicRouter.get('/posts/:slug', asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, ...published }).lean()
  if (!post) return res.status(404).json({ message: 'Post not found' })
  res.json(post)
}))

publicRouter.post('/contact-messages', asyncHandler(async (req, res) => {
  const message = await ContactMessage.create(req.body)
  res.status(201).json({ id: message._id })
}))
