import express from 'express';
import { Application } from "express";
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '@/middlewares/errorHandler';
import httpLogger from '@/middlewares/httpLogger';
import { authenticateUser } from '@/middlewares/authentication';
import { RouteNotFoundError } from '@/common/errors';
import { BASE_URL } from '@/constants/settings';
import { configureProtectedRoutes, configurePublicRoutes } from '@/routes';

function configureBaseMiddlewares(app: Application) {
    // CORS configuration
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // GZIP compression
    app.use(compression());
    app.use(helmet());
    // HTTP logger
    app.use(httpLogger);
}

const app = express();

configureBaseMiddlewares(app);

configurePublicRoutes(app);

app.use(BASE_URL, authenticateUser);
configureProtectedRoutes(app);

app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
app.use(errorHandler);

export default app;