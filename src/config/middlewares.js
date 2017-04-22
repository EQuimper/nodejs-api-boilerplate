/**
 * Configuration of the server middlewares.
 */

import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';

const isTest = process.env.NODE_ENV === 'test';

export default app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  app.use(helmet());
  app.use(cors());
  if (!isTest) {
    app.use(morgan('dev'));
  }
  app.use(compression());
};
