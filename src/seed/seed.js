import { connectDatabase } from '../config/database.js';
import { About } from '../models/About.js';
import { ContactInfo } from '../models/ContactInfo.js';
import { Experience } from '../models/Experience.js';
import { Project } from '../models/Project.js';
import { SkillCategory } from '../models/SkillCategory.js';
import { about, contactInfo, experience, projects, skillCategories } from './portfolioData.js';

const seed = async () => {
  await connectDatabase();

  await Promise.all([
    About.deleteMany({}),
    SkillCategory.deleteMany({}),
    Project.deleteMany({}),
    Experience.deleteMany({}),
    ContactInfo.deleteMany({}),
  ]);

  await Promise.all([
    About.create(about),
    SkillCategory.insertMany(skillCategories),
    Project.insertMany(projects),
    Experience.insertMany(experience),
    ContactInfo.create(contactInfo),
  ]);

  console.log('Portfolio data seeded successfully');
  process.exit(0);
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
