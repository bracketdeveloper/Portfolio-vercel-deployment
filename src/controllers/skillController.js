import { SkillCategory } from '../models/SkillCategory.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getSkills = asyncHandler(async (_req, res) => {
  const categories = await SkillCategory.find().sort({ sortOrder: 1, name: 1 });
  const skillTabs = categories.map(({ tabId, name }) => ({ id: tabId, name }));
  const skillsByCategory = categories.reduce((output, category) => {
    output[category.tabId] = category.skills;
    return output;
  }, {});

  sendResponse(res, 200, 'Skills fetched', { skillTabs, skillsByCategory, categories });
});

export const getSkillCategory = asyncHandler(async (req, res) => {
  const category = await SkillCategory.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Skill category not found');
  sendResponse(res, 200, 'Skill category fetched', category);
});

export const createSkillCategory = asyncHandler(async (req, res) => {
  const category = await SkillCategory.create(req.body);
  sendResponse(res, 201, 'Skill category created', category);
});

export const updateSkillCategory = asyncHandler(async (req, res) => {
  const category = await SkillCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new ApiError(404, 'Skill category not found');
  sendResponse(res, 200, 'Skill category updated', category);
});

export const deleteSkillCategory = asyncHandler(async (req, res) => {
  const category = await SkillCategory.findByIdAndDelete(req.params.id);
  if (!category) throw new ApiError(404, 'Skill category not found');
  sendResponse(res, 200, 'Skill category deleted', category);
});
