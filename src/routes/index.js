/**
 * API Routes
 */

import { Router } from 'express';

import UserRoutes from './user.routes';
import SeedRoutes from './seed.routes';

// Middlewares
import logErrorService from '../services/log';

const routes = new Router();

const isDev = process.env.NODE_ENV === 'development';

routes.use('/users', UserRoutes);

if (isDev) {
  routes.use('/seeds', SeedRoutes);
}

routes.use(logErrorService);

export default routes;
