import express from 'express';
import * as stats from '@/controllers/statistics';
import { authorize } from '@/middlewares/authentication';
import { role } from '@/constants/roles';

const router = express.Router();

router.get("/stats/performance", authorize([role.ADMIN, role.SUPERVISOR]), stats.getUsersPerformance);

export default router;