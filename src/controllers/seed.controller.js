/**
 * Seed controller for fill your db of fake data
 */

import User from '../models/user.model';
import { userSeed, deleteUserSeed } from '../seeds/user.seed';

export async function seedUsers(req, res, next) {
  try {
    await userSeed(req.params.count);

    return res
      .status(200)
      .send(`User seed success! Created ${req.params.count} users!`);
  } catch (e) {
    return next(e);
  }
}

export async function clearSeedUsers(req, res) {
  try {
    await deleteUserSeed();

    return res.status(200).send('User collection empty');
  } catch (e) {
    throw e;
  }
}

/**
 * Take all your model and clear it
 *
 * @param {any} req
 * @param {any} res
 * @returns {String} All collections clear
 */
export async function clearAll(req, res) {
  try {
    await Promise.all([User.remove()]);

    return res.status(200).send('All collections clear');
  } catch (e) {
    throw e;
  }
}
