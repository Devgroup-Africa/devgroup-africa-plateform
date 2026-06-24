import jwt from 'jsonwebtoken'
import { Router } from 'express'
import { env } from '../config/env.js'
import { ActivityLog } from '../models/ActivityLog.js'
import { User } from '../models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const authRouter = Router()

async function ensureEnvAdmin() {
  if (!env.adminEmail || !env.adminPassword) return null

  const existing = await User.findOne({ email: env.adminEmail }).select('+passwordHash +passwordSalt')
  if (existing) return existing

  return User.create({
    name: 'Administrateur DevGroup',
    email: env.adminEmail,
    role: 'admin',
    scope: 'Administration',
    status: 'active',
    password: env.adminPassword,
  })
}

authRouter.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!env.jwtSecret) {
    return res.status(500).json({ message: 'Admin authentication is not configured' })
  }

  await ensureEnvAdmin()

  const user = await User.findOne({ email: String(email || '').toLowerCase(), status: 'active' }).select('+passwordHash +passwordSalt')
  if (!user || !(await user.verifyPassword(password || ''))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  user.lastLoginAt = new Date()
  await user.save()
  await ActivityLog.create({
    action: 'login',
    resource: 'users',
    resourceId: user._id,
    title: user.email,
    details: 'Connexion administrateur',
    actorEmail: user.email,
  })

  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, env.jwtSecret, { expiresIn: '8h' })
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, scope: user.scope, avatar: user.avatar } })
}))
