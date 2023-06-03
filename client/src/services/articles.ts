import { GetArticleResponse } from 'types';
import api from 'utils/api';

export const getArticle = async (id: string) => {
    return await api.get<GetArticleResponse>(`/articles/${id}`);
};

export const getArticles = async () => {
    return await api.get<GetArticleResponse[]>('/articles');
};
