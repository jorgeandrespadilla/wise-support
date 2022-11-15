import { LoginRequest, LoginResponse } from "types";
import api from "utils/api";

export const authenticateUser = async (request: LoginRequest) => {
    return await api.post<LoginResponse>("/login", request);
}