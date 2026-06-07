import { Router } from 'express';
import {
  createExperience,
  deleteExperience,
  getExperience,
  getExperienceItem,
  updateExperience,
} from '../controllers/experienceController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { experienceSchema, objectIdSchema } from '../validators/portfolioValidators.js';

const router = Router();

router.get('/', getExperience);
router.post('/', requireAdmin, validate(experienceSchema), createExperience);
router.get('/:id', validate(objectIdSchema, 'params'), getExperienceItem);
router.put('/:id', requireAdmin, validate(objectIdSchema, 'params'), validate(experienceSchema), updateExperience);
router.delete('/:id', requireAdmin, validate(objectIdSchema, 'params'), deleteExperience);

export default router;
