class AuthenticationController {
  login(req, res, next) {
    res.status(200).json({ token: req.user.createToken() });

    return next();
  }
}

export default new AuthenticationController();
