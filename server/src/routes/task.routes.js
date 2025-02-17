import express from 'express';
import { 
    createTask, 
    getTasks, 
    updateTask, 
    deleteTask, 
    // getTasksByProject,
    // getTasksByStatus 
} from '../controllers/task.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getTasks);
// router.get('/project/:projectId', getTasksByProject);
// router.get('/status/:status', getTasksByStatus);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;