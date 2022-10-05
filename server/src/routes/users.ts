import express from 'express';
import * as users from '@/controllers/users';

const router = express.Router();

router.get("/users", users.getUsers);
router.get("/users/:userId", users.getUserById);
router.post("/users", users.createUser);
router.put("/users/:userId", users.updateUser);
router.delete("/users/:userId", users.deleteUser);

export default router;