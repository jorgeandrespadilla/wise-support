/** Authentication **/

export interface LoginRequest {
    email: string;
    password: string;
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

export interface UpdateUserRequest extends AddUserRequest {}


/** Tickets **/

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

export interface UpdateCategoryRequest extends AddCategoryRequest {}


/** Tasks **/

export interface AddTaskRequest {
    description: string;
    timeSpent: number;
    ticketId: number;
}

export interface UpdateTaskRequest extends AddTaskRequest {}
