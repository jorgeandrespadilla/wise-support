/** Authentication **/

interface TokenData {
    token: string;
    expiresIn: number; // In milliseconds
}

export interface LoginResponse {
    accessToken: TokenData;
    refreshToken: TokenData;
}

export interface RefreshResponse extends LoginResponse {}


/** Roles **/

export interface RoleResponse {
    id: number;
    code: string;
    name: string;
    description: string | null;
}


/** Users **/

export interface GetUserResponse {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    birthDate: string;
    role: RoleResponse;
}

export interface GetUserProfileResponse extends GetUserResponse {}


/** Tickets **/

export interface TicketUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
}

export interface TicketCategoryResponse {
    id: number;
    name: string;
    code: string;
    description: string | null;
}

export interface GetTicketResponse {
    id: number;
    code: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    timeEstimated: number;
    timeSpent: number;
    createdAt: string; // Date
    endedAt: string | null; // Date
    assigneeId: number;
    supervisorId: number;
    categoryId: number;
    assignee: TicketUserResponse;
    supervisor: TicketUserResponse;
    category: TicketCategoryResponse;
}

/** Categories **/

export interface GetCategoryResponse {
    id: number;
    name: string;
    code: string;
    description: string | null;
}


/** Tasks **/

export interface GetTaskResponse {
    id: number;
    description: string;
    createdAt: string; // Date
    timeSpent: number;
}
