import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import path from 'node:path'
import { env } from './config/env.js'
import { requireAuth } from './middleware/auth.js'
import { errorHandler, notFoundHandler } from './middleware/errors.js'
import { adminRouter } from './routes/admin.js'
import { authRouter } from './routes/auth.js'
import { publicRouter } from './routes/public.js'
import { uploadsRouter } from './routes/uploads.js'

export function createApp() {
  const app = express()

  app.use(cors({ origin: env.clientOrigin, credentials: true }))
  app.use(express.json({ limit: '1mb' }))
  app.use(morgan('dev'))
  app.use('/uploads', express.static(path.resolve('uploads')))

  app.get('/api/health', (req, res) => {
    res.json({ ok: true, service: 'devgroup-africa-api' })
  })

  app.use('/api/public', publicRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/admin/uploads', requireAuth, uploadsRouter)
  app.use('/api/admin', requireAuth, adminRouter)
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
