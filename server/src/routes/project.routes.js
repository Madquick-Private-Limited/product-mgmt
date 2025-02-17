import express from 'express';
import { 
    createProject, 
    getProjects, 
    updateProject, 
    deleteProject 
} from '../controllers/project.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createProject);
router.get('/', getProjects);
router.put('/:projectId', updateProject);
router.delete('/:projectId', deleteProject);

export default router;