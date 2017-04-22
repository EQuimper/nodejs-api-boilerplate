/**
 * User controller
 */

import User from '../models/user.model';

class UserController {
  async create(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = new User({
        email,
        password,
      });
      return res.status(201).json({ user: await user.save() });
    } catch (e) {
      e.status = 400;
      next(e);
    }
  }
}

export default new UserController();
