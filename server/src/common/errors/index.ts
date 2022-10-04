import { StatusCode } from "@/constants/http";

export type ErrorData = { [key: string]: any };

export class ServerError extends Error {
    constructor(
        public message: string,
        public code: string = 'INTERNAL_ERROR',
        public status: number = StatusCode.INTERNAL_SERVER_ERROR,
        public data: ErrorData = {},
    ) {
        super();
    }
}

export class RouteNotFoundError extends ServerError {
    constructor(originalUrl: string) {
        super(`Route '${originalUrl}' does not exist.`, 'ROUTE_NOT_FOUND', StatusCode.NOT_FOUND);
    }
}

export class EntityNotFoundError extends ServerError {
    constructor(entityName: string) {
        super(`${entityName} not found.`, 'ENTITY_NOT_FOUND', StatusCode.NOT_FOUND);
    }
}
