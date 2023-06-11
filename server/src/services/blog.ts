import { KNOWLEDGE_BASE_URL } from '@/constants/settings';
import { buildHttpClient } from '@/utils/httpClientFactory';
import { BlogPost, EncryptedData } from '@/types';
import { decrypt } from './kms';

const httpClient = buildHttpClient(`${KNOWLEDGE_BASE_URL}/api`);

const decryptData = async <T>(data: EncryptedData): Promise<T> => {
    // Wait for all chunks to be decrypted
    const decryptedChunks = await Promise.all(
        data.chunks.map(chunk => decrypt(chunk, 'base64')),
    );
    // Join all chunks into a single string
    const decryptedData = decryptedChunks.join('');
    return JSON.parse(decryptedData) as T;
};

export const getPosts = async (): Promise<BlogPost[]> => {
    const response = await httpClient.get<EncryptedData>('/blog');
    const posts = await decryptData<BlogPost[]>(response);
    return posts;
};

export const getPost = async (id: string): Promise<BlogPost> => {
    const response = await httpClient.get<EncryptedData>(`/blog/${id}`);
    const post = await decryptData<BlogPost>(response);
    return post;
};
