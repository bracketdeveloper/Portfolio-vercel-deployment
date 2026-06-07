import { About } from '../models/About.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getAbout = asyncHandler(async (_req, res) => {
  const about = await About.findOne().sort({ updatedAt: -1 });
  sendResponse(res, 200, 'About section fetched', about);
});

export const upsertAbout = asyncHandler(async (req, res) => {
  // Delete existing document to handle schema migration from array to number
  await About.findOneAndDelete({});
  
  const about = await About.create(req.body);
  sendResponse(res, 200, 'About section saved', about);
});

export const deleteAbout = asyncHandler(async (_req, res) => {
  const about = await About.findOneAndDelete({});
  if (!about) throw new ApiError(404, 'About section not found');
  sendResponse(res, 200, 'About section deleted', about);
});

export const uploadProfilePic = asyncHandler(async (req, res) => {
  const existingAbout = await About.findOne();
  if (!existingAbout) {
    throw new ApiError(409, 'Create the about section before uploading a profile picture');
  }

  const profilePic = `/uploads/profile/${req.file.filename}`;
  const about = await About.findByIdAndUpdate(existingAbout._id, { profilePic }, { new: true });
  sendResponse(res, 200, 'Profile picture uploaded', { profilePic, about });
});
