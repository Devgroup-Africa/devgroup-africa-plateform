import crypto from 'node:crypto'
import { promisify } from 'node:util'
import mongoose from 'mongoose'

const scrypt = promisify(crypto.scrypt)

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'editor', index: true },
    scope: { type: String, default: 'Administration' },
    avatar: { type: String, default: '' },
    status: { type: String, enum: ['active', 'disabled'], default: 'active', index: true },
    lastLoginAt: { type: Date },
    passwordHash: { type: String, required: true, select: false },
    passwordSalt: { type: String, required: true, select: false },
  },
  { timestamps: true },
)

userSchema.virtual('password').set(function setPassword(password) {
  this._plainPassword = password
})

userSchema.pre('validate', async function hashPassword(next) {
  if (!this._plainPassword) return next()

  this.passwordSalt = crypto.randomBytes(16).toString('hex')
  const derivedKey = await scrypt(this._plainPassword, this.passwordSalt, 64)
  this.passwordHash = derivedKey.toString('hex')
  this._plainPassword = undefined
  next()
})

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const derivedKey = await scrypt(password, this.passwordSalt, 64)
  const submittedHash = Buffer.from(derivedKey.toString('hex'), 'hex')
  const storedHash = Buffer.from(this.passwordHash, 'hex')

  return submittedHash.length === storedHash.length && crypto.timingSafeEqual(submittedHash, storedHash)
}

export const User = mongoose.model('User', userSchema)
