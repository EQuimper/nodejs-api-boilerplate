/* eslint-disable no-console */

import express from 'express';

import './config/database';
import middlewaresConfig from './config/middlewares';
import constants from './config/constants';

const app = express();

middlewaresConfig(app);

app.listen(constants.PORT, err => {
  if (err) {
    console.error('Cannot run');
  } else {
    console.log(
      `
      App listen on port: ${constants.PORT}
      Env: ${process.env.NODE_ENV}
    `,
    );
  }
});
