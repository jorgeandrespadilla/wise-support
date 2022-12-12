import express from 'express';
import * as tasks from '@/controllers/tasks';
import { authorize } from '@/middlewares/authentication';
import { allRoles, role } from '@/constants/roles';

const router = express.Router();

router.get("/tasks", authorize(allRoles), tasks.getTasksByTicketId);
router.get("/tasks/:taskId", authorize(allRoles), tasks.getTaskById);
router.post("/tasks", authorize([role.AGENT]), tasks.createTask);
router.put("/tasks/:taskId", authorize([role.AGENT]), tasks.updateTask);
router.delete("/tasks/:taskId", authorize([role.AGENT]), tasks.deleteTask);

export default router;