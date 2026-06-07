import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

export const requireAdmin = (req, _res, next) => {
  const apiKey = req.header('x-admin-api-key');

  if (!apiKey || apiKey !== env.ADMIN_API_KEY) {
    return next(new ApiError(401, 'API key is missing or invalid'));
  }

  return next();
};

export const requireApiKey = requireAdmin;
