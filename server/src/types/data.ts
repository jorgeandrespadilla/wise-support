import {
    Role as DbRole,
    Ticket as DbTicket,
    Task as DbTask,
    User as DbUser,
    Category as DbCategory,
    TicketStatus,
    TicketPriority,
} from "@prisma/client";
import { SubsetOf } from "./utilities";


/** Authentication **/

export interface TokenData {
    userId?: number;
}


/** Roles **/

export interface Role extends SubsetOf<DbRole, {
    id: number;
    code: string,
    name: string,
    description: string | null,
}> { }


/** Users **/

export interface User extends SubsetOf<DbUser, {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    createdAt: Date;
    roleId: number;
}> {
    role: Role;
}

export interface UserProfile extends User {}

export interface UserResponse extends Omit<User, 'birthDate'> {
    fullName: string;
    birthDate: string;
}

export interface UserProfileResponse extends Omit<UserProfile, 'birthDate'> {
    fullName: string;
    birthDate: string;
}


/** Categories **/

export interface Category extends SubsetOf<DbCategory, {
    id: number;
    code: string;
    name: string;
    description: string | null;
}> { }


/** Tasks **/

export interface Task extends SubsetOf<DbTask, {
    id: number;
    description: string;
    timeSpent: number;
    createdAt: Date;
}> { }


/** Tickets **/

export interface TicketUser extends SubsetOf<DbUser, {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}> { }

export interface TicketCategory extends SubsetOf<DbCategory, {
    id: number;
    name: string;
    code: string;
    description: string | null;
}> { }

export interface TicketTask extends SubsetOf<DbTask, {
    id: number;
    timeSpent: number;
}> { }

export interface TicketDetail extends SubsetOf<DbTicket, {
    id: number;
    code: string;
    title: string;
    description: string | null;
    status: TicketStatus;
    priority: TicketPriority;
    timeEstimated: number;
    createdAt: Date;
    endedAt: Date | null;
    assigneeId: number;
    supervisorId: number;
    categoryId: number;
}> {
    assignee: TicketUser;
    supervisor: TicketUser;
    category: TicketCategory;
    tasks: TicketTask[];
}


/** Statistics **/

export interface StatsUser extends SubsetOf<DbUser, {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}> { }

export interface StatsTicket extends SubsetOf<DbTicket, {
    id: number;
    priority: TicketPriority;
    timeEstimated: number;
}> {
    assignee: StatsUser;
}

export interface TicketPerformance {
    performanceScore: number;
    attentionTime: number;
}

export interface UserPerformance {
    user: StatsUser;
    resolvedTickets: number;
    performanceScore: number;
    attentionTime: number;
}

export interface PerformanceStats {
    newTickets: number;
    overallAttentionTime: number;
    averagePerformanceScore: number;
    users: UserPerformance[];
}

export interface StatsUserResponse extends StatsUser {
    fullName: string;
}

export interface UserPerformanceResponse extends UserPerformance {
    user: StatsUserResponse;
}

export interface PerformanceStatsResponse extends PerformanceStats {
    users: UserPerformanceResponse[];
}
