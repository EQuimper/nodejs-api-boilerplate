require('dotenv').config();

const WHITELIST = {
  posts: {
    create: ['title', 'text'],
    update: ['title', 'text'],
  },
  users: {
    create: ['email', 'username', 'password'],
  },
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
  FB_CLIENTID: process.env.FB_CLIENTID_DEV,
  FB_CLIENTSECRET: process.env.FB_CLIENTSECRET_DEV,
  FB_CALLBACK: process.env.FB_CALLBACK_DEV,
};

const testConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
  MONGO_URL: 'mongodb://localhost/nodejs-api-boilerplate-test',
  FB_CLIENTID: process.env.FB_CLIENTID_TEST,
  FB_CLIENTSECRET: process.env.FB_CLIENTSECRET_TEST,
  FB_CALLBACK: process.env.FB_CALLBACK_TEST,
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
  FB_CLIENTID: process.env.FB_CLIENTID_PROD,
  FB_CLIENTSECRET: process.env.FB_CLIENTSECRET_PROD,
  FB_CALLBACK: process.env.FB_CALLBACK_PROD,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  RAVEN_ID: process.env.RAVEN_ID,
  WHITELIST,
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
