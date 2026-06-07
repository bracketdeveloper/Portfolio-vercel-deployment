import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { objectIdSchema, projectSchema } from '../validators/portfolioValidators.js';

const router = Router();

router.get('/', getProjects);
router.get('/:idOrSlug', getProject);
router.post('/', requireAdmin, validate(projectSchema), createProject);
router.put('/:id', requireAdmin, validate(objectIdSchema, 'params'), validate(projectSchema), updateProject);
router.delete('/:id', requireAdmin, validate(objectIdSchema, 'params'), deleteProject);

export default router;
