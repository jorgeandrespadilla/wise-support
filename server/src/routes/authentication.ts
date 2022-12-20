import express from 'express';
import { authenticate, refresh } from '@/controllers/authentication';

const router = express.Router();

router.post('/auth/login', authenticate);
router.post('/auth/refresh', refresh);

export default router;
