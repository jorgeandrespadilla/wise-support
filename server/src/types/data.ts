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


export interface Role extends SubsetOf<DbRole, {
    id: number;
    code: string,
    name: string,
    description: string | null,
}> { }

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

export interface Category extends SubsetOf<DbCategory, {
    id: number;
    code: string;
    name: string;
    description: string | null;
}> { }

export interface Task extends SubsetOf<DbTask, {
    id: number;
    description: string;
    timeSpent: number;
    createdAt: Date;
}> { }

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

export interface TokenData {
    userId?: number;
}
