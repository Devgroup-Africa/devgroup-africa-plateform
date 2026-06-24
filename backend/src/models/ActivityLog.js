import mongoose from 'mongoose'

const activityLogSchema = new mongoose.Schema(
  {
    action: { type: String, enum: ['created', 'updated', 'deleted', 'login', 'seed'], required: true, index: true },
    resource: { type: String, required: true, index: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true, trim: true },
    details: { type: String, default: '' },
    actorEmail: { type: String, default: '' },
  },
  { timestamps: true },
)

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema)
