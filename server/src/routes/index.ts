import { BASE_API_URL } from '@/constants/settings';
import { Application } from 'express';
import authentication from './authentication';
import roles from './roles';
import users from './users';
import categories from './categories';
import tickets from './tickets';
import tasks from './tasks';
import stats from './statistics';
import articles from './articles';

export const configureRoutes = (app: Application) => {
    app.use(BASE_API_URL, authentication);
    app.use(BASE_API_URL, users);
    app.use(BASE_API_URL, roles);
    app.use(BASE_API_URL, categories);
    app.use(BASE_API_URL, tickets);
    app.use(BASE_API_URL, tasks);
    app.use(BASE_API_URL, stats);
    app.use(BASE_API_URL, articles);
};
