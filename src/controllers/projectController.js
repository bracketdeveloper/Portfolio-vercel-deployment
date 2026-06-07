import { Project } from '../models/Project.js';
import mongoose from 'mongoose';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';

// Helper function to convert newline-separated text into an array of strings
const formatDescription = (description) => {
  if (typeof description === 'string') {
    return description
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  }
  return description;
};

export const getProjects = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const projects = await Project.find(filter).sort({ sortOrder: 1, createdAt: -1 });
  sendResponse(res, 200, 'Projects fetched', projects);
});

export const getProject = asyncHandler(async (req, res) => {
  const conditions = [{ slug: req.params.idOrSlug }];
  if (mongoose.isValidObjectId(req.params.idOrSlug)) {
    conditions.push({ _id: req.params.idOrSlug });
  }

  const project = await Project.findOne({ $or: conditions });
  if (!project) throw new ApiError(404, 'Project not found');
  sendResponse(res, 200, 'Project fetched', project);
});

export const createProject = asyncHandler(async (req, res) => {
  const projectData = { ...req.body };
  if (projectData.description) {
    projectData.description = formatDescription(projectData.description);
  }

  const project = await Project.create(projectData);
  sendResponse(res, 201, 'Project created', project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const projectData = { ...req.body };
  if (projectData.description) {
    projectData.description = formatDescription(projectData.description);
  }

  const project = await Project.findByIdAndUpdate(req.params.id, projectData, {
    new: true,
    runValidators: true,
  });
  if (!project) throw new ApiError(404, 'Project not found');
  sendResponse(res, 200, 'Project updated', project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  sendResponse(res, 200, 'Project deleted', project);
});