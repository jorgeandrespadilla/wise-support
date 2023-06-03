import { KNOWLEDGE_BASE_URL } from '@/constants/settings';
import { buildHttpClient } from '@/utils/httpClientFactory';
import { BlogPost } from '@/types';

const httpClient = buildHttpClient(`${KNOWLEDGE_BASE_URL}/api`);

export const getPosts = async (): Promise<BlogPost[]> => {
    const response = await httpClient.get<BlogPost[]>('/blog');
    return response;
};

export const getPost = async (id: string): Promise<BlogPost> => {
    const response = await httpClient.get<BlogPost>(`/blog/${id}`);
    return response;
};
