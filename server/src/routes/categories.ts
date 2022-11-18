import express from 'express';
import * as categories from '@/controllers/categories';
import { authorize } from '@/middlewares/authentication';

const router = express.Router();

router.get("/categories", authorize, categories.getCategories);
router.get("/categories/:categoryId", authorize, categories.getCategoryById);
router.post("/categories", authorize, categories.createCategory);
router.put("/categories/:categoryId", authorize, categories.updateCategory);
router.delete("/categories/:categoryId", authorize, categories.deleteCategory);

export default router;