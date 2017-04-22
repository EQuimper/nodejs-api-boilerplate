export async function login(req, res, next) {
  res.status(200).json({ token: req.user.createToken() });

  return next();
}
