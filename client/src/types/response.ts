/** Authentication **/

interface TokenData {
    token: string;
    expiresIn: number; // In milliseconds
}

export interface LoginResponse {
    accessToken: TokenData;
    refreshToken: TokenData;
}

export type RefreshResponse = LoginResponse;

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

export type GetUserProfileResponse = GetUserResponse;

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

/** Statistics **/

//#region Users performance

export interface StatsUserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface UserPerformanceResponse {
    user: GetUserResponse;
    resolvedTickets: number;
    performanceScore: number;
    attentionTime: number;
}

export interface GetPerformanceStatsResponse {
    newTickets: number;
    overallAttentionTime: number;
    averagePerformanceScore: number;
    users: UserPerformanceResponse[];
}

//#endregion

//#region Categories statistics

export interface StatsCategoryDetail {
    id: number;
    name: string;
    code: string;
    description: string | null;
}

export interface StatsCategoryResponse {
    category: StatsCategoryDetail;
    totalTickets: number;
}

export interface GetCategoriesStatsResponse {
    categories: StatsCategoryResponse[];
    totalCategories: number;
}

//#endregion
