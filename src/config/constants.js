require('dotenv').config();

const devConfig = {
  JWT_SECRET: 'thisisasecret',
  MONGO_URL: 'mongodb://localhost/nodejs-api-boilerplate-dev',
};

const testConfig = {
  JWT_SECRET: 'thisisasecret',
  MONGO_URL: 'mongodb://localhost/nodejs-api-boilerplate-dev',
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URL: process.env.MONGO_URL,
  RAVEN_ID: process.env.RAVEN_ID,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  SALT_ROUND: 10,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
