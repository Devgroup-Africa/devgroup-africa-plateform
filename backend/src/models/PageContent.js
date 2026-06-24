import mongoose from 'mongoose'

const pageContentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    sections: { type: mongoose.Schema.Types.Mixed, default: {} },
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
    },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true },
)

export const PageContent = mongoose.model('PageContent', pageContentSchema)
