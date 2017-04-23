/**
 * User Routes
 */

import { Router } from 'express';
import validate from 'express-validation';

import * as UserController from '../controllers/user.controller';
import * as AuthenticationController
  from '../controllers/authentication.controller';
import { authLocal } from '../services/auth';

const routes = new Router();

routes.post(
  '/signup',
  validate(UserController.validation.create),
  UserController.create,
);
routes.post(
  '/login',
  validate(AuthenticationController.validation.login),
  authLocal,
  AuthenticationController.login,
);

export default routes;
