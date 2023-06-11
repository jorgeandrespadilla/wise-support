import { Article, BlogPost } from '@/types';
import { catchErrors } from '@/utils/catchErrors';
import * as blogService from '@/services/blog';

export const getArticles = catchErrors(async (_req, res) => {
    const blogPosts: BlogPost[] = await blogService.getPosts();
    const articles: Article[] = blogPosts.map(blogPost =>
        mapToArticle(blogPost),
    );
    res.send(articles);
});

export const getArticleById = catchErrors(async (req, res) => {
    const articleId = req.params.articleId;
    const blogPost: BlogPost = await blogService.getPost(articleId);
    const article: Article = mapToArticle(blogPost);
    res.send(article);
});

function mapToArticle(blogPost: BlogPost): Article {
    return {
        id: blogPost.id,
        title: blogPost.title,
        category: blogPost.category,
        content: blogPost.content,
        createdAt: blogPost.created_at,
        updatedAt: blogPost.updated_at,
    };
}
