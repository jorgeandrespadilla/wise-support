import axios from 'axios';
import { accessToken } from './auth';

const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

const defaultConfig = {
    baseURL: `${apiBaseUrl}/api`,
    headers: () => ({
        'Content-Type': 'application/json',
        Authorization: accessToken.get()
            ? `Bearer ${accessToken.get()}`
            : undefined,
    }),
    error: {
        code: 'INTERNAL_ERROR',
        message: 'Algo salió mal.',
        status: 503,
        data: {},
    },
};

const httpClient = <T>(method: string, url: string, variables?: unknown) =>
    new Promise<T>((resolve, reject) => {
        axios({
            url: `${defaultConfig.baseURL}${url}`,
            method,
            headers: defaultConfig.headers(),
            params: method === 'get' ? variables : undefined,
            data: method !== 'get' ? variables : undefined,
        }).then(
            response => {
                resolve(response.data);
            },
            error => {
                if (error.response) {
                    reject(error.response.data.error);
                } else {
                    reject(defaultConfig.error);
                }
            },
        );
    });

const api = {
    get: <T>(url: string, variables?: unknown) =>
        httpClient<T>('get', url, variables),
    post: <T>(url: string, variables?: unknown) =>
        httpClient<T>('post', url, variables),
    put: <T>(url: string, variables?: unknown) =>
        httpClient<T>('put', url, variables),
    delete: <T>(url: string, variables?: unknown) =>
        httpClient<T>('delete', url, variables),
};

export default api;
