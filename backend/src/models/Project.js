import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    color: { type: String, default: 'blue' },
    description: { type: String, required: true },
    body: { type: String, default: '' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true },
)

export const Project = mongoose.model('Project', projectSchema)
