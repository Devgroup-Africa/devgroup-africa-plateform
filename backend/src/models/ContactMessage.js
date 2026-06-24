import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    organization: { type: String, default: '' },
    needType: { type: String, default: '' },
    message: { type: String, required: true },
    source: { type: String, enum: ['contact', 'quote'], default: 'contact' },
    status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
  },
  { timestamps: true },
)

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema)
