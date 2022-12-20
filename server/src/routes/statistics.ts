import express from 'express';
import * as stats from '@/controllers/statistics';
import { authorize } from '@/middlewares/authentication';
import { role } from '@/constants/roles';

const router = express.Router();

router.get(
    '/stats/performance',
    authorize([role.ADMIN, role.SUPERVISOR]),
    stats.getUsersPerformance,
);
router.get(
    '/stats/categories',
    authorize([role.ADMIN]),
    stats.getCategoriesStats,
);

export default router;
