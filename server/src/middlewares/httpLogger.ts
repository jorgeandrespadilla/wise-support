import logger from "@/utils/logger";
import { RequestHandler } from "express";

const httpLogger: RequestHandler = (req, res, next) => {
    let method = req.method;
    let url = req.path;
    let status = res.statusCode;
    logger.http(`${method} ${url} (${status})`);
    next();
};

export default httpLogger;