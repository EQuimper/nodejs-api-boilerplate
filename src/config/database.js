/* eslint-disable no-console */

/**
 * Configuration for the database
 *
 */

import mongoose from 'mongoose';

import constants from './constants';

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// Connect the db with the url provide
mongoose.connect(constants.MONGO_URL);

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => console.error(e));
