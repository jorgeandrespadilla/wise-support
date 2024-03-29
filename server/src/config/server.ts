import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '@/middlewares/errorHandler';
import httpLogger from '@/middlewares/httpLogger';
import { RouteNotFoundError } from '@/common/errors';
import { configureRoutes } from '@/routes';
import { CORS_ORIGIN } from '@/constants/settings';

function configureBaseMiddlewares(app: express.Application) {
    // CORS configuration
    app.use(
        cors({
            origin: CORS_ORIGIN,
        }),
    );
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

configureRoutes(app);

app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
app.use(errorHandler);

export default app;
