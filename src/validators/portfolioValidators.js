import Joi from 'joi';

const stringArray = Joi.array().items(Joi.string().trim().min(1)).default([]);

export const objectIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const aboutSchema = Joi.object({
  experienceYears: Joi.number().integer().min(0).required(),
  projectsBuilt: Joi.number().integer().min(0).required(),
  happyClients: Joi.number().integer().min(0).required(),
  coreStack: Joi.number().integer().min(0).required(),
  profilePic: Joi.string().trim().allow('').default(''),
  description: Joi.string().trim().min(20).required(),
});

export const skillCategorySchema = Joi.object({
  tabId: Joi.string().trim().lowercase().pattern(/^[a-z0-9-]+$/).required(),
  name: Joi.string().trim().min(2).max(80).required(),
  sortOrder: Joi.number().integer().min(0).default(0),
  skills: Joi.array().items(
    Joi.object({
      name: Joi.string().trim().min(2).max(120).required(),
      level: Joi.number().integer().min(0).max(100).required(),
    })
  ).default([]),
});

export const projectSchema = Joi.object({
  title: Joi.string().trim().min(2).max(180).required(),
  slug: Joi.string().trim().lowercase().pattern(/^[a-z0-9-]+$/).optional(),
  category: Joi.string().trim().min(2).max(80).required(),
  description: Joi.string().trim().min(20).required(),
  tech: stringArray,
  links: Joi.object({
    github: Joi.string().uri().allow('').default(''),
    demo: Joi.string().uri().allow('').default(''),
  }).default({ github: '', demo: '' }),
  caseStudy: Joi.object({
    challenge: Joi.string().trim().min(20).required(),
    solution: Joi.string().trim().min(20).required(),
    metrics: Joi.string().trim().min(5).required(),
  }).required(),
  sortOrder: Joi.number().integer().min(0).default(0),
  isFeatured: Joi.boolean().default(true),
});

export const experienceSchema = Joi.object({
  role: Joi.string().trim().min(2).max(140).required(),
  company: Joi.string().trim().min(2).max(140).required(),
  location: Joi.string().trim().min(2).max(140).required(),
  period: Joi.string().trim().min(2).max(140).required(),
  bullets: stringArray,
  tech: stringArray,
  sortOrder: Joi.number().integer().min(0).default(0),
});

export const contactInfoSchema = Joi.object({
  email: Joi.string().email().required(),
  location: Joi.string().trim().min(2).max(180).required(),
  github: Joi.string().uri().required(),
  linkedin: Joi.string().uri().required(),
});

export const contactMessageSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(120).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().trim().min(2).max(180).required(),
  message: Joi.string().trim().min(10).max(5000).required(),
});

export const contactStatusSchema = Joi.object({
  status: Joi.string().valid('new', 'read', 'archived').required(),
});
