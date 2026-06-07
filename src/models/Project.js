import mongoose from 'mongoose';
import slugify from 'slugify';

const caseStudySchema = new mongoose.Schema(
  {
    challenge: { type: String, required: true, trim: true },
    solution: { type: String, required: true, trim: true },
    metrics: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    // Kept as String type so Mongoose does not break text on commas
    description: { type: String, required: true, trim: true },
    tech: [{ type: String, trim: true }],
    links: {
      github: { type: String, default: '', trim: true },
      demo: { type: String, default: '', trim: true },
    },
    caseStudy: { type: caseStudySchema, required: true },
    sortOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.pre('validate', function createSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

projectSchema.index({ sortOrder: 1, createdAt: -1 });
projectSchema.index({ category: 1 });

export const Project = mongoose.model('Project', projectSchema);