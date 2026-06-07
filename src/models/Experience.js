import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    period: { type: String, required: true, trim: true },
    bullets: [{ type: String, trim: true }],
    tech: [{ type: String, trim: true }],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ sortOrder: 1, createdAt: -1 });

export const Experience = mongoose.model('Experience', experienceSchema);
