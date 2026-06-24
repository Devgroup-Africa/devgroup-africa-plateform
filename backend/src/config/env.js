import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT || 7100,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:7000',
  mongodbUri: process.env.MONGODB_URI || '',
  adminEmail: process.env.ADMIN_EMAIL || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  jwtSecret: process.env.JWT_SECRET || '',
}
