import mongoose from 'mongoose'

const catalogItemSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['service', 'solution'], required: true, index: true },
    slug: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Blocks' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    details: {
      eyebrow: { type: String, default: '' },
      title: { type: String, default: '' },
      bullets: [{ type: String }],
      offers: [{
        title: { type: String, required: true },
        description: { type: String, default: '' },
        price: { type: String, default: 'Sur devis' },
        duration: { type: String, default: '' },
        includes: [{ type: String }],
      }],
    },
  },
  { timestamps: true },
)

catalogItemSchema.index({ type: 1, slug: 1 }, { unique: true })

export const CatalogItem = mongoose.model('CatalogItem', catalogItemSchema)
