export interface LoginResponse {
    authToken: string;
}

export interface GetUserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    birthDate: string;
}
