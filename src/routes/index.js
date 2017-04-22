/**
 * API Routes
 */

import { Router } from 'express';

import UserRoutes from './user.routes';

// Middlewares
import logErrorService from '../services/log';

const routes = new Router();

routes.use('/users', UserRoutes);

routes.use(logErrorService);

export default routes;
