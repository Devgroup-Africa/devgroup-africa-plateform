import mongoose from 'mongoose'

const communicationItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    channel: { type: String, required: true, trim: true },
    objective: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, enum: ['idea', 'planned', 'published'], default: 'idea' },
    scheduledAt: { type: Date },
  },
  { timestamps: true },
)

export const CommunicationItem = mongoose.model('CommunicationItem', communicationItemSchema)
