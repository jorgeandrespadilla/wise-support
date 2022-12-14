import { StatusCode } from '@/constants/http';

export type ErrorData = Record<string, unknown>;

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
        super(
            `La ruta '${originalUrl}' no existe.`,
            'ROUTE_NOT_FOUND',
            StatusCode.NOT_FOUND,
        );
    }
}

export class EntityNotFoundError extends ServerError {
    constructor(entityName: string, data: ErrorData = {}) {
        super(
            `${entityName} no encontrado.`,
            'ENTITY_NOT_FOUND',
            StatusCode.NOT_FOUND,
            data,
        );
    }
}

export class ValidationError extends ServerError {
    constructor(message: string, data: ErrorData = {}) {
        super(message, 'VALIDATION_ERROR', StatusCode.BAD_REQUEST, data);
    }
}

export class InvalidTokenError extends ServerError {
    constructor(reasonMessage = 'Token inválido.') {
        super(`Token inválido.`, 'INVALID_TOKEN', StatusCode.UNAUTHORIZED, {
            reason: reasonMessage,
        });
    }
}

export class UnauthorizedError extends ServerError {
    constructor(reasonMessage: string) {
        super(
            `Usuario no autorizado.`,
            'UNAUTHORIZED',
            StatusCode.UNAUTHORIZED,
            {
                reason: reasonMessage,
            },
        );
    }
}

export class ForbiddenError extends ServerError {
    constructor(reasonMessage = 'Acceso restringido.') {
        super(`Usuario no autorizado.`, 'FORBIDDEN', StatusCode.FORBIDDEN, {
            reason: reasonMessage,
        });
    }
}
