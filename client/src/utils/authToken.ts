const tokenKey = "authToken";

export const getAuthToken = (): string | null => localStorage.getItem('authToken');

export const setAuthToken = (token: string) => localStorage.setItem(tokenKey, token);

export const removeAuthToken = () => localStorage.removeItem(tokenKey);
