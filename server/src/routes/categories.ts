import express from 'express';
import * as categories from '@/controllers/categories';
import { authorize } from '@/middlewares/authentication';
import { allRoles, role } from '@/constants/roles';

const router = express.Router();

router.get("/categories", authorize(allRoles), categories.getCategories);
router.get("/categories/:categoryId", authorize(allRoles), categories.getCategoryById);
router.post("/categories", authorize([role.ADMIN]), categories.createCategory);
router.put("/categories/:categoryId", authorize([role.ADMIN]), categories.updateCategory);
router.delete("/categories/:categoryId", authorize([role.ADMIN]), categories.deleteCategory);

export default router;