/**
 * Error handler for api routes
 */

// eslint-disable-next-line no-unused-vars
export default function errorHandler(err, req, res, next) {
  if (!err) {
    return res.sendStatus(500);
  }

  const error = {
    message: err.message || 'Internal Server Error.',
  };

  if (err.errors) {
    error.errors = {};
    const { errors } = err;
    Object.keys(errors).forEach(key => {
      error.errors[key] = errors[key].message;
    });
  }

  res.status(err.status || 500).json(error);
}
