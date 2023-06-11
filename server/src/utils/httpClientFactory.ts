import { ServerError } from '@/common/errors';
import axios from 'axios';

type HttpClientOptions = {
    accessToken?: string;
    contentType?: string;
};

export function buildHttpClient(
    apiBaseUrl: string,
    { accessToken, contentType = 'application/json' }: HttpClientOptions,
) {
    const headers = {
        'Content-Type': contentType,
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };

    const httpClient = <T>(method: string, url: string, variables?: unknown) =>
        new Promise<T>((resolve, reject) => {
            axios({
                url: `${apiBaseUrl}${url}`,
                method,
                headers: headers,
                params: method === 'get' ? variables : undefined,
                data: method !== 'get' ? variables : undefined,
            }).then(
                response => {
                    resolve(response.data);
                },
                error => {
                    if (error.response) {
                        reject(new ServerError(error.response.data.message));
                    } else {
                        reject(new ServerError('Algo salió mal.'));
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

    return api;
}
