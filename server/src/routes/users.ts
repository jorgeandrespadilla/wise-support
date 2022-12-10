import express from 'express';
import * as users from '@/controllers/users';
import { authorize } from '@/middlewares/authentication';

const router = express.Router();

router.get("/profile", authorize, users.getCurrentUser);

router.get("/users", authorize, users.getUsers);
router.get("/users/:userId", authorize, users.getUserById);
router.post("/users", authorize, users.createUser);
router.put("/users/:userId", authorize, users.updateUser);
router.delete("/users/:userId", authorize, users.deleteUser);

export default router;