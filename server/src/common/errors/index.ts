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
        super(`La ruta '${originalUrl}' no existe.`, 'ROUTE_NOT_FOUND', StatusCode.NOT_FOUND);
    }
}

export class EntityNotFoundError extends ServerError {
    constructor(entityName: string, data: ErrorData = {}) {
        super(`${entityName} no encontrado.`, 'ENTITY_NOT_FOUND', StatusCode.NOT_FOUND, data);
    }
}

export class ValidationError extends ServerError {
    constructor(message: string, data: ErrorData = {}) {
        super(message, 'VALIDATION_ERROR', StatusCode.BAD_REQUEST, data);
    }
}