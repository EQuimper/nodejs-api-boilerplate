/**
 * User Routes
 */

import { Router } from 'express';

import UserController from '../controllers/user.controller';
import AuthenticationController from '../controllers/authentication.controller';
import { authLocal } from '../middlewares/auth-handler';

const routes = new Router();

routes.post('/signup', UserController.create);
routes.post('/login', authLocal, AuthenticationController.login);

export default routes;
