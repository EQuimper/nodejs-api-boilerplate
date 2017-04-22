import passport from 'passport';

import '../controllers/utils/passport';

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
