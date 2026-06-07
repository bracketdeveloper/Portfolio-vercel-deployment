import { About } from '../models/About.js';
import { ContactInfo } from '../models/ContactInfo.js';
import { Experience } from '../models/Experience.js';
import { Project } from '../models/Project.js';
import { SkillCategory } from '../models/SkillCategory.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getPortfolio = asyncHandler(async (_req, res) => {
  const [about, skillCategories, projects, experience, contactInfo] = await Promise.all([
    About.findOne().sort({ updatedAt: -1 }),
    SkillCategory.find().sort({ sortOrder: 1, name: 1 }),
    Project.find({ isFeatured: true }).sort({ sortOrder: 1, createdAt: -1 }),
    Experience.find().sort({ sortOrder: 1, createdAt: -1 }),
    ContactInfo.findOne().sort({ updatedAt: -1 }),
  ]);

  const skillTabs = skillCategories.map(({ tabId, name }) => ({ id: tabId, name }));
  const skillsByCategory = skillCategories.reduce((output, category) => {
    output[category.tabId] = category.skills;
    return output;
  }, {});

  sendResponse(res, 200, 'Portfolio fetched', {
    about,
    skills: { skillTabs, skillsByCategory },
    projects,
    experience,
    contact: contactInfo,
  });
});
