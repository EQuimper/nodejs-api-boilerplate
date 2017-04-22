/**
 * User Routes
 */

import { Router } from 'express';

import * as UserController from '../controllers/user.controller';
import * as AuthenticationController
  from '../controllers/authentication.controller';
import { authLocal } from '../services/auth';

const routes = new Router();

routes.post('/signup', UserController.create);
routes.post('/login', authLocal, AuthenticationController.login);

export default routes;
