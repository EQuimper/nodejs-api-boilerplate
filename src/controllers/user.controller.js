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
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      username: Joi.string().min(3).max(20).required(),
    },
  },
};

export async function create(req, res, next) {
  try {
    const user = await User.create(req.body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
