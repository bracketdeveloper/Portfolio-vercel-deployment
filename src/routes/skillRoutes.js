import { Router } from 'express';
import {
  createSkillCategory,
  deleteSkillCategory,
  getSkillCategory,
  getSkills,
  updateSkillCategory,
} from '../controllers/skillController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { objectIdSchema, skillCategorySchema } from '../validators/portfolioValidators.js';

const router = Router();

router.get('/', getSkills);
router.post('/categories', requireAdmin, validate(skillCategorySchema), createSkillCategory);
router.get('/categories/:id', validate(objectIdSchema, 'params'), getSkillCategory);
router.put('/categories/:id', requireAdmin, validate(objectIdSchema, 'params'), validate(skillCategorySchema), updateSkillCategory);
router.delete('/categories/:id', requireAdmin, validate(objectIdSchema, 'params'), deleteSkillCategory);

export default router;
