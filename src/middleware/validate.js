import { ApiError } from '../utils/apiError.js';

export const validate = (schema, property = 'body') => (req, _res, next) => {
  const { value, error } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return next(new ApiError(422, 'Validation failed', error.details.map((item) => item.message)));
  }

  req[property] = value;
  return next();
};
