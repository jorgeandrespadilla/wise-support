export interface LoginRequest {
    email: string;
    password: string;
}

export interface AddUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
}

export interface UpdateUserRequest extends AddUserRequest {}