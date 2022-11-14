import express from 'express';
import * as users from '@/controllers/roles';
import { authorize } from '@/middlewares/authentication';

const router = express.Router();

router.get("/roles", authorize, users.getRoles);

export default router;