import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: true }
);

const skillCategorySchema = new mongoose.Schema(
  {
    tabId: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    skills: [skillSchema],
  },
  { timestamps: true }
);

skillCategorySchema.index({ sortOrder: 1, name: 1 });

export const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
