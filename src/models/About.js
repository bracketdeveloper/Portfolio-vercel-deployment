import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    experienceYears: { type: Number, required: true, min: 0 },
    projectsBuilt: { type: Number, required: true, min: 0 },
    happyClients: { type: Number, required: true, min: 0 },
    coreStack: { type: Number, required: true, min: 0 },
    profilePic: { type: String, default: '' },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const About = mongoose.model('About', aboutSchema);
