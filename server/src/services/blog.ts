import { KNOWLEDGE_BASE_URL } from '@/constants/settings';
import { buildHttpClient } from '@/utils/httpClientFactory';
import { parseJson } from '@/utils/jsonHelpers';
import { BlogPost } from '@/types';
import { decrypt } from './kms';

const httpClient = buildHttpClient(`${KNOWLEDGE_BASE_URL}/api`, {
    contentType: 'text/plain',
});

export const getPosts = async (): Promise<BlogPost[]> => {
    const response = await httpClient.get<string>('/blog');
    const decryptedResponse = await decrypt(response);
    const posts = parseJson<BlogPost[]>(decryptedResponse);
    return posts;
};

export const getPost = async (id: string): Promise<BlogPost> => {
    const response = await httpClient.get<string>(`/blog/${id}`);
    const decryptedResponse = await decrypt(response);
    const post = parseJson<BlogPost>(decryptedResponse);
    return post;
};
