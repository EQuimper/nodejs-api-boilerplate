import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import User from '../models/user.model';
import constants from '../config/constants';

/**
 * Local Strategy Auth
 */
const localOpts = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

/**
 * JWT Strategy Auth
 */
const jwtOpts = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  // Telling Passport where to find the secret
  secretOrKey: constants.JWT_SECRET,
};

const jwtLogin = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

/**
 * Facebook Strategy Auth
 */
const fbOpts = {
  // Telling Passport where to find the clientId
  clientID: constants.FB_CLIENTID,
  // Telling Passport where to find the secret
  clientSecret: constants.FB_CLIENTSECRET,
  // Telling Passport callbackUrl
  callbackURL: constants.FB_CALLBACK,
  profileFields: ['id', 'displayName', 'photos', 'email'],
};

const fbLogin = new FacebookStrategy(
  fbOpts,
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        return done(null, user);
      }
      // const profilePic = ` https://graph.facebook.com/${profile.id}/picture?type=large`;
      const body = {
        name: profile.displayName,
        email: profile.emails[0].value,
        // picture: profilePic,
        providerData: {
          uid: profile.id,
          provider: profile.provider,
        },
      };
      const newuser = await User.create(body);
      return done(null, newuser);
    } catch (e) {
      return done(e, false);
    }
  },
);

passport.use(localLogin);
passport.use(jwtLogin);
passport.use(fbLogin);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
export const authFB = passport.authenticate('facebook', {
  session: false,
  scope: ['email'],
});
