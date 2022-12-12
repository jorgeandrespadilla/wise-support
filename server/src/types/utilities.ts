import { TicketPriority, TicketStatus } from "@prisma/client";

/**
 * Checks if two types are identical.
 */
type IsExact<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

/**
 * Sets all properties of T as true (one deep-level).
 */
type ValidType<T> = {
    [P in keyof T]: true;
}

/**
 * Check if U is a subset of T (only with types or interfaces).
 * T: Set (eg. { a: number, b: string })
 * U: Subset (eg. { a: number })
 * 
 * For each key in U, check if the type of that key in U is exactly the same as the type of that key in T.
 * If a property in U is not present in T, the property will be never.
 * If a property in U is present in T, the property will be true if the types are exactly the same, false otherwise.
 */
type IsSubsetOf<T, U> = {
    [P in keyof U]: P extends keyof T
    ? IsExact<U[P], T[P]>
    : never;
}

/**
 * Returns a subset (U) of a data type if U is a subset of T.
 * If U is not a subset of T, returns never.
 */
export type SubsetOf<T, U> = IsSubsetOf<T, U> extends ValidType<U> ? U : never;


type EnumDataTypes = TicketStatus | TicketPriority; // Data types that are enums and should be treated as primitives.
type NotAnObject = boolean | number | string | null | undefined | Date | EnumDataTypes;
/**
 * Maps a data type to a boolean data type that represents the shape of an interface but with boolean values only.
 * 
 * Data type that represents the shape of an interface
 * but with boolean values only and adds "select" fields
 * if it is an object.
 * If the data type is an array, it will only consider the array data type.
 */
export type SelectFields<T> = {
    [P in keyof T]: T[P] extends NotAnObject
    ? true
    : T[P] extends Array<infer U>
    ? { select: SelectFields<U> }
    : T[P] extends object
    ? { select: SelectFields<T[P]> }
    : true;
}