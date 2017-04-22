import { Router } from 'express';

import UserRoutes from './user.routes';

const routes = new Router();

routes.use('/users', UserRoutes);

export default routes;
