import { 
    Role as DbRole,
    Ticket as DbTicket,
    Task as DbTask,
    User as DbUser,
    Category as DbCategory,
} from "@prisma/client";

/**
 * Returns a subset (U) of a data type if U is a subset of T.
 * If U is not a subset of T, returns never.
 * T: Set (eg. { a: number, b: string })
 * U: Subset (eg. { a: number })
 */
export type Subset<T, U> = T extends U ? U : never;

/**
 * Maps a data type to a boolean data type that represents the shape of an interface but with boolean values only.
 * 
 * Data type that represents the shape of an interface
 * but with boolean values only and adds "select" fields
 * if it is an object.
 * If the data type is an array, it will only consider the array data type.
 */ 
export type SelectFields<T> = {
    [P in keyof T]: T[P] extends Date | boolean | number | string 
        ? true 
        : T[P] extends Array<infer U>
            ? { select: SelectFields<U> }
            : T[P] extends object 
                ? { select: SelectFields<T[P]> } 
                : true;
}

export type UserWithRole = DbUser & {
    role: DbRole;
}

export interface Category extends Subset<DbCategory, {
    id: number;
    code: string;
    name: string;
    description: string | null;
}> {}

export interface Task extends Subset<DbTask, {
    id: number;
    description: string;
    timeSpent: number;
    createdAt: Date;
}> {}

export interface TicketUser extends Subset<DbUser, {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}> {}

export interface TicketCategory extends Subset<DbCategory, {
    id: number;
    name: string;
    code: string;
    description: string | null;
}> {}

export interface TicketTask extends Subset<DbTask, {
    id: number;
    timeSpent: number;
}> {}

export interface TicketDetail extends Subset<DbTicket, {
    id: number;
    code: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
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
