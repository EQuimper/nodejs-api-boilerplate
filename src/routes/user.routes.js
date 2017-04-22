/**
 * User Routes
 */

import { Router } from 'express';

import UserController from '../controllers/user.controller';

const routes = new Router();

routes.post('/signup', UserController.create);

export default routes;
