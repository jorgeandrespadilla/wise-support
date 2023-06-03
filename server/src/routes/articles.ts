import express from 'express';
import * as articles from '@/controllers/articles';
import { authorize } from '@/middlewares/authentication';
import { role } from '@/constants/roles';

const router = express.Router();

router.get('/articles', authorize([role.ADMIN]), articles.getArticles);
router.get(
    '/articles/:articleId',
    authorize([role.ADMIN]),
    articles.getArticleById,
);
export default router;
