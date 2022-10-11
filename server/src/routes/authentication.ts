import express from 'express';
import { authenticateUser } from '@/controllers/authentication';

const router = express.Router();

router.post("/login", authenticateUser);

export default router;