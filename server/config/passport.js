/* Initializing passport.js */
const passport = require('passport');
const local = require('./passport/local');
const google = require('./passport/google');
const dbConfig = require('../db');
const unsupportedMessage = require('../db/unsupportedMessage');
const dbPassport = dbConfig.passport;

module.exports = () => {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.

  if (dbPassport && dbPassport.deserializeUser) {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(dbPassport.deserializeUser);
  } else {
    console.warn(unsupportedMessage('(de)serialize User'));
  }

  // use the following strategies
  local(passport);
  google(passport);
};
