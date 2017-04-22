/**
 * User controller
 */

import { isEmail } from 'validator';

import User from '../models/user.model';

export async function create(req, res, next) {
  const { email, password, name, username } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required!' });
  } else if (!isEmail(email)) {
    return res.status(400).json({ message: 'Email is not valid!' });
  }

  if (!name) {
    return res.status(400).json({ message: 'Name is required!' });
  }

  if (!username) {
    return res.status(400).json({ message: 'Username is required!' });
  } else if (username.length < 3) {
    return res.status(400).json({ message: 'Username need to be longer!' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required!' });
  }

  try {
    const user = new User({
      email,
      password,
      username,
      name,
    });
    return res.status(201).json(await user.save());
  } catch (e) {
    e.status = 400;
    next(e);
  }
}
