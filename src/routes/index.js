/**
 * API Routes
 */

import { Router } from 'express';

import UserRoutes from './user.routes';

// Middlewares
import errorHandler from '../middlewares/error-handler';

const routes = new Router();

routes.use('/users', UserRoutes);

routes.use(errorHandler);

export default routes;
