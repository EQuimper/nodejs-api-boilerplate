/* eslint-disable no-console */
/**
 * Server setup
 */
import express from 'express';

import './config/database';
import middlewaresConfig from './config/middlewares';
import constants from './config/constants';
import ApiRoutes from './routes';

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(constants.PORT, err => {
    if (err) {
      console.error('Cannot run');
    } else {
      console.log(`
        Yep this is working 🍺
        App listen on port: ${constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `);
    }
  });
}

export default app;
