export interface RoleResponse {
    id: number;
    code: string;
    name: string;
    description: string | null;
}

export interface UserResponse {
    fullName: string;
    role: RoleResponse;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    roleId: number;
}

export interface CategoryResponse {
    id: number;
    name: string;
    code: string;
    description: string | null;
}