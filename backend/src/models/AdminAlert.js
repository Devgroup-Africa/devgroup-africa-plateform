import mongoose from 'mongoose'

const adminAlertSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    details: { type: String, default: '' },
    priority: { type: String, enum: ['info', 'medium', 'high'], default: 'info', index: true },
    severity: { type: String, enum: ['info', 'warning', 'danger'], default: 'info', index: true },
    resource: { type: String, default: '' },
    count: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'resolved'], default: 'active', index: true },
  },
  { timestamps: true },
)

export const AdminAlert = mongoose.model('AdminAlert', adminAlertSchema)
