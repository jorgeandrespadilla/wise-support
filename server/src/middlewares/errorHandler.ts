import { ErrorRequestHandler } from "express";
import { ServerError } from "@/common/errors";
import { pick } from "@/utils/objectHelpers";

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    const clientError = error instanceof ServerError ? error : new ServerError('Something went wrong.');
    const errorResponse = pick(clientError, ['message', 'code', 'status', 'data']);

    res.status(clientError.status).send({ error: errorResponse });
};

export default errorHandler;