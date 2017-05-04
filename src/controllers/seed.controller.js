/**
 * Seed controller for fill your db of fake data
 */

import HTTPStatus from 'http-status';

import User from '../models/user.model';
import { userSeed, deleteUserSeed } from '../seeds/user.seed';

export async function seedUsers(req, res, next) {
  try {
    await userSeed(req.params.count);

    return res
      .status(HTTPStatus.OK)
      .send(`User seed success! Created ${req.params.count} users!`);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export async function clearSeedUsers(req, res, next) {
  try {
    await deleteUserSeed();

    return res.status(HTTPStatus.OK).send('User collection empty');
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

/**
 * Take all your model and clear it
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns {String} All collections clear
 */
export async function clearAll(req, res, next) {
  try {
    await Promise.all([User.remove()]);

    return res.status(HTTPStatus.OK).send('All collections clear');
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
