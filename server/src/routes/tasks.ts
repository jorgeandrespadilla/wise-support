import express from 'express';
import * as tasks from '@/controllers/tasks';
import { authorize } from '@/middlewares/authentication';

const router = express.Router();

router.get("/tasks", authorize, tasks.getTasksByTicketId);
router.post("/tasks", authorize, tasks.createTask);
router.put("/tasks/:taskId", authorize, tasks.updateTask);
router.delete("/tasks/:taskId", authorize, tasks.deleteTask);

export default router;