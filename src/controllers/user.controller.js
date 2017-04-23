/**
 * User controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import User from '../models/user.model';

export const validation = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      username: Joi.string().min(3).max(20).required(),
    },
  },
};

export async function create(req, res, next) {
  try {
    return res.status(HTTPStatus.CREATED).json(await User.create(req.body));
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    next(e);
  }
}
