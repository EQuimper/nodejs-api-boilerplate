'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _constants = require('./config/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

const app = (0, _express2.default)();

app.listen(_constants2.default.PORT, err => {
  if (err) {
    console.error('Cannot run');
  } else {
    console.log(`
      App listen on port: ${_constants2.default.PORT}
      Env: ${process.env.NODE_ENV}
    `);
  }
});