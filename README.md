# NodeJS-API-Boilerplate

## Usage

For get raven log create account here: [Sentry](https://sentry.io/)

1. Install dependencies `yarn` or `npm i`
2. Create a `.env` file in the root like
  ```
  MONGO_URL=yourmongodb
  JWT_SECRET=yoursecret
  RAVEN_ID=yourapikey
  ```
3.

Monitoring Server on `http://localhost:3000/status`

---

## Scripts

### DEV

First thing you want to start babel to compile the project by doing `yarn dev:watch` or `npm run dev:watch`

After

```
yarn dev
```

or

```
npm run dev
```

### DEV-DEBUG

```
yarn dev:debug
```

or

```
npm run dev:debug
```

## Seeds

For seed just run one of this following comand. This is helpful in dev for making fake user.

*This is only available in dev environment*

- Seeds 10 user `yarn db:seeds-user`
- Clear user collection `yarn db:seeds-clearUser`
- Clear all collection `yarn db:seeds-clear`

---

## Techs

- [Helmet](https://github.com/helmetjs/helmet)
- [Cors](https://github.com/expressjs/cors)
- [Body-Parser](https://github.com/expressjs/body-parser)
- [Morgan](https://github.com/expressjs/morgan)
- [PassportJS](https://github.com/jaredhanson/passport)
- [Passport-Local](https://github.com/jaredhanson/passport-local)
- [Passport-JWT](https://github.com/themikenicholson/passport-jwt)
- [Raven](https://github.com/getsentry/raven-node)

## Todo

### Add

- [x] Raven Log
- Sendgrid or Other Mail supply
- Add S3 for user image