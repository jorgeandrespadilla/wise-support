/** Authentication **/

export interface LoginRequest {
    token: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

/** Users **/

export interface AddUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: string;
    roleId: number;
}

export type UpdateUserRequest = AddUserRequest;

/** Tickets **/

export interface GetTicketsRequest {
    status?: string;
}

export interface AddTicketRequest {
    title: string;
    description: string;
    priority: string;
    timeEstimated: number;
    assigneeId: number;
    supervisorId: number;
    categoryId: number;
}

export interface UpdateTicketRequest extends AddTicketRequest {
    status: string;
}

/** Categories **/

export interface AddCategoryRequest {
    name: string;
    code: string;
    description: string;
}

export type UpdateCategoryRequest = AddCategoryRequest;

/** Tasks **/

export interface AddTaskRequest {
    description: string;
    timeSpent: number;
    ticketId: number;
}

export type UpdateTaskRequest = AddTaskRequest;

/** Statistics **/

export interface GetPerformanceStatsRequest {
    startDate: string;
    endDate: string;
}

export interface GetCategoriesStatsRequest {
    startDate: string;
    endDate: string;
}
