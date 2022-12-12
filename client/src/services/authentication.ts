import { LoginRequest, LoginResponse, RefreshRequest, RefreshResponse } from "types";
import api from "utils/api";

export const authenticate = async (request: LoginRequest) => {
    return await api.post<LoginResponse>("/auth/login", request);
}

export const refresh = async (request: RefreshRequest) => {
    return await api.post<RefreshResponse>("/auth/refresh", request);
}