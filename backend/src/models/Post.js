import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    coverImage: { type: String, default: '' },
    body: { type: String, default: '' },
    readingTime: { type: String, default: '5 min de lecture' },
    publishedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
  },
  { timestamps: true },
)

export const Post = mongoose.model('Post', postSchema)
