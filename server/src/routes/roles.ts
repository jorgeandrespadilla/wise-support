import express from 'express';
import * as users from '@/controllers/roles';
import { authorize } from '@/middlewares/authentication';
import { allRoles } from '@/constants/roles';

const router = express.Router();

router.get("/roles", authorize(allRoles), users.getRoles);

export default router;