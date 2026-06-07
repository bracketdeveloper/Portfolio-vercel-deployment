import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    location: { type: String, required: true, trim: true },
    github: { type: String, required: true, trim: true },
    linkedin: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema);
