/**
 * Configuration of the server middlewares.
 */

import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';

const isDev = process.env.NODE_ENV === 'development';

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  if (isDev) {
    app.use(morgan('dev'));
  }
  app.use(compression());
};
