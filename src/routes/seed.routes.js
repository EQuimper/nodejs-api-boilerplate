import { Router } from 'express';

import * as SeedController from '../controllers/seed.controller';

const routes = new Router();

routes.get('/clear', SeedController.clearAll);
routes.get('/users/clear', SeedController.clearSeedUsers);
routes.get('/users/:count', SeedController.seedUsers);

export default routes;
