/**
 * Authentication controller
 */

import HTTPStatus from 'http-status';
import Joi from 'joi';

export const validation = {
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    },
  },
};

/**
 * Login function
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {Object} User - _id && token
 */
export async function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toJSON());

  return next();
}
