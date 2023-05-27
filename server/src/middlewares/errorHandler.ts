import { ErrorRequestHandler } from 'express';
import { pick } from 'lodash';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { ServerError } from '@/common/errors';
import logger from '@/utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    const isServerError = error instanceof ServerError;
    const isDbInitializationError =
        error instanceof PrismaClientInitializationError;
    if (isServerError) {
        logger.warn(`(${error.constructor.name}) ${error.message}`);
    } else if (isDbInitializationError) {
        logger.error(
            `(${error.constructor.name}) Cannot connect to database \n${error.message}`,
        );
    } else {
        logger.error(
            `(${error?.constructor?.name ?? 'Error'}) ${
                error?.message ?? 'Desconocido'
            }${error?.stack ? `\n${error.stack}` : ''}`,
        );
    }

    const clientError = isServerError
        ? error
        : new ServerError('Algo salió mal.'); // Something went wrong
    const errorResponse = pick(clientError, [
        'message',
        'code',
        'status',
        'data',
    ]);
    res.status(clientError.status).send({ error: errorResponse });
};

export default errorHandler;
