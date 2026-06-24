import mongoose from 'mongoose'

const mediaItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ['image', 'video', 'document'], default: 'image', index: true },
    alt: { type: String, default: '' },
    source: { type: String, default: 'admin' },
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
  },
  { timestamps: true },
)

export const MediaItem = mongoose.model('MediaItem', mediaItemSchema)
