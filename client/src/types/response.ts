export interface LoginResponse {
    authToken: string;
}

export interface RoleResponse {
    id: number;
    code: string;
    name: string;
    description: string | null;
}

export interface GetUserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    birthDate: string;
    role: RoleResponse;
}
