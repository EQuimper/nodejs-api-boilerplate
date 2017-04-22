/* eslint-disable no-console */

import express from 'express';

import './config/database';
import constants from './config/constants';

const app = express();

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
