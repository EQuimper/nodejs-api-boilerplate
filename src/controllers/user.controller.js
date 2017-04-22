/**
 * User controller
 */

import User from '../models/user.model';

class UserController {
  async create(req, res) {
    const { email, password } = req.body;
    try {
      const user = new User({
        email,
        password,
      });
      return res.status(201).json({ user: await user.save() });
    } catch (e) {
      return res.status(400);
    }
  }
}

export default new UserController();
