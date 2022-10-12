import axios from "axios";
import { getAuthToken } from "./authToken";

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:4000';

const defaultConfig = {
    baseURL: `${apiBaseUrl}/api`,
    headers: () => ({
        'Content-Type': 'application/json',
        'Authorization': getAuthToken() ? `Bearer ${getAuthToken()}` : undefined
    }),
    error: {
        code: 'INTERNAL_ERROR',
        message: 'Algo salió mal.',
        status: 503,
        data: {},
    },
};

const api = <T>(method: string, url: string, variables?: any) =>
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

const apiMethods = {
    get: <T>(url: string, variables?: any) => api<T>('get', url, variables),
    post: <T>(url: string, variables?: any) => api<T>('post', url, variables),
    put: <T>(url: string, variables?: any) => api<T>('put', url, variables),
    delete: <T>(url: string, variables?: any) => api<T>('delete', url, variables),
};

export default apiMethods;