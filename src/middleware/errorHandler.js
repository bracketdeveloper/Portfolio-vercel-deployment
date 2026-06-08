import { ApiError } from '../utils/apiError.js';

export const notFoundHandler = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;

  // Log errors for debugging (especially important for Vercel)
  if (statusCode === 500) {
    console.error('Internal Server Error:', error);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error' : error.message,
    details: error.details || undefined,
    ...(process.env.NODE_ENV !== 'production' && { error: error.message }),
  });
};
