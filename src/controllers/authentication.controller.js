/**
 * Authentication controller
 */

import HTTPStatus from 'http-status';

/**
 * Login function
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {Object} with the user token
 */
export async function login(req, res, next) {
  res.status(HTTPStatus.OK).json(req.user.toJSON());

  return next();
}
