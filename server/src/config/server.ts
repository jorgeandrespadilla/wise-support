import express from 'express';
import { Application } from "express";
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

function configureBaseMiddlewares(app: Application) {
    // CORS configuration
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // Gzip compression
    app.use(compression());
    app.use(helmet());
}

const app = express();

configureBaseMiddlewares(app);

export default app;