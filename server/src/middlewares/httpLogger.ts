import logger from '@/utils/logger';
import { RequestHandler } from 'express';

const httpLogger: RequestHandler = (req, res, next) => {
    const method = req.method;
    const url = req.path;
    const status = res.statusCode;
    logger.http(`${method} ${url} (${status})`);
    next();
};

export default httpLogger;
