const npsUtils = require('nps-utils');

const concurrent = npsUtils.concurrent;
const crossEnv = npsUtils.crossEnv;
const rimraf = npsUtils.rimraf;
const series = npsUtils.series;

module.exports = {
  scripts: {
    build: {
      description: 'Building in production environment.',
      default: `${crossEnv('NODE_ENV=production')} babel --out-dir=dist ./src`,
      withClean: series.nps('clean', 'build')
    },
    clean: {
      description: 'Clean dist folder.',
      default: rimraf('dist'),
    },
    default: {
      description: 'Start project with pm2 on production.',
      script: `yarn build && ${crossEnv('NODE_ENV=production')} pm2 dist`
    },
    dev: {
      default: {
        description: 'Running on dev environment.',
        script: `${crossEnv('NODE_ENV=development')} nodemon dist`
      },
      watch: {
        description: 'Babel watch for change and compile.',
        script: 'babel -w --out-dir=dist ./src',
      },
      debug: {
        description: 'Running on dev environment with debug on.',
        script: `${crossEnv('NODE_ENV=development')} MONGOOSE_DEBUG=true DEBUG=express:* nodemon dist`
      }
    },
    lint: {
      default: 'eslint src --color',
      fix: 'eslint --fix src'
    },
    lintStaged: 'lint-staged',
    db: {
      seedsUser: 'bash ./scripts/seeds/user.seed.sh',
      seedsClearUser: 'bash ./scripts/seeds/clearUser.seed.sh',
      seedsClear: 'bash ./scripts/seeds/clearAll.seed.sh'
    },
    test: {
      default: `${crossEnv('NODE_ENV=test')} mocha $(find __tests__ -name *.test.js) --colors --compilers js:babel-register`,
      watch: `${crossEnv('NODE_ENV=test')} mocha $(find __tests__ -name *.test.js) --colors --compilers js:babel-register -w`,
      cover: `${crossEnv('NODE_ENV=test')} istanbul cover _mocha $(find __tests__ -name *.test.js) -- --compilers js:babel-register --colors --bail --recursive '__tests__/**/*.test.js'`,
      checkCover: series('nps test.cover', 'istanbul check-coverage')
    },
    cover: {
      open: 'open coverage/lcov-report/*.html'
    },
    reportCoverage: 'coveralls < ./coverage/lcov.info',
    commit: 'git-cz',
    release: {
      description: 'We automate releases with semantic-release. This should only be run on travis',
      script: series(
        'semantic-release pre',
        'npm publish',
        'semantic-release post'
      ),
    },
    validate: {
      description: 'Validate code by linting, type-checking.',
      default: concurrent.nps('lint'),
    },
  }
};
