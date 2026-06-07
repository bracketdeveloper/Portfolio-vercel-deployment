import { Experience } from '../models/Experience.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getExperience = asyncHandler(async (_req, res) => {
  const experience = await Experience.find().sort({ sortOrder: 1, createdAt: -1 });
  sendResponse(res, 200, 'Experience fetched', experience);
});

export const getExperienceItem = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (!experience) throw new ApiError(404, 'Experience not found');
  sendResponse(res, 200, 'Experience fetched', experience);
});

export const createExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.create(req.body);
  sendResponse(res, 201, 'Experience created', experience);
});

export const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!experience) throw new ApiError(404, 'Experience not found');
  sendResponse(res, 200, 'Experience updated', experience);
});

export const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) throw new ApiError(404, 'Experience not found');
  sendResponse(res, 200, 'Experience deleted', experience);
});
