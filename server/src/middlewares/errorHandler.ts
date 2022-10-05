import { ErrorRequestHandler } from "express";
import { pick } from 'lodash';
import { ServerError } from "@/common/errors";

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    console.log(error);
    const clientError = error instanceof ServerError 
        ? error 
        : new ServerError('Algo salió mal.'); // Something went wrong
    const errorResponse = pick(clientError, ['message', 'code', 'status', 'data']);
    res.status(clientError.status).send({ error: errorResponse });
};

export default errorHandler;