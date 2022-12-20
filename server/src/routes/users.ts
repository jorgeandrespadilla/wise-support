import express from 'express';
import * as users from '@/controllers/users';
import { authorize } from '@/middlewares/authentication';
import { allRoles, role } from '@/constants/roles';

const router = express.Router();

router.get('/profile', authorize(allRoles), users.getCurrentUser);

router.get('/users', authorize(allRoles), users.getUsers);
router.get('/users/:userId', authorize(allRoles), users.getUserById);
router.post('/users', authorize([role.ADMIN]), users.createUser);
router.put('/users/:userId', authorize([role.ADMIN]), users.updateUser);
router.delete('/users/:userId', authorize([role.ADMIN]), users.deleteUser);

export default router;
