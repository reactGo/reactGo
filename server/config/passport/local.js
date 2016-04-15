/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

const LocalStrategy = require('passport-local').Strategy;
const dbConfig = require('../../db');
const unsupportedMessage = require('../../db/unsupportedMessage');
const dbPassport = dbConfig.passport;

module.exports = (passport) => {
  if (!dbPassport || !dbPassport.local || ! typeof dbPassport.local === 'function') {
    console.warn(unsupportedMessage('passport-local'));
    return;
  }

  /*
  By default, LocalStrategy expects to find credentials in parameters named username and password.
  If your site prefers to name these fields differently,
  options are available to change the defaults.
  */
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, dbPassport.local));
};
