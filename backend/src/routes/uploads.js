import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'
import { Router } from 'express'
import { MediaItem } from '../models/MediaItem.js'

const uploadDirectory = path.resolve('uploads')

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true })
}

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const basename = path.basename(file.originalname, extension).replace(/[^a-z0-9]+/gi, '-').toLowerCase()
    callback(null, `${Date.now()}-${basename}${extension}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Only image uploads are allowed'))
    }
    callback(null, true)
  },
})

export const uploadsRouter = Router()

uploadsRouter.post('/image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' })
  }

  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  const media = await MediaItem.create({
    title: req.file.originalname,
    url,
    type: 'image',
    source: 'upload',
  })

  res.status(201).json({
    url,
    media,
  })
})
