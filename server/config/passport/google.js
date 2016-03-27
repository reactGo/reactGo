var sequelize = require('../../models/index').sequelize;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models').User;
var secrets = require('../secrets');

function attachGoogleAccount(user, profile, accessToken, done) {
  user.google = profile.id;
  user.name = user.name || profile.displayName;
  user.gender = user.gender || profile._json.gender;
  user.picture = user.picture || profile._json.picture;
  return sequelize.transaction(function(transaction) {
    return user.save({ transaction: transaction }).then(function() {
      return user.createToken({
        kind: 'google',
        accessToken: accessToken
      }, { transaction: transaction });
    });
  }).then(function() {
    return done(null, user, { message: 'Google account has been linked.' });
  });
}

function createUserWithToken(profile, accessToken, done) {
  return sequelize.transaction(function(transaction) {    
    return User.create({
      email: profile._json.emails[0].value,
      google: profile.id,
      name: profile.displayName,
      gender: profile._json.gender,
      picture: profile._json.picture
    }, { transaction: transaction }).then(function(user) {
      return user.createToken({
        kind: 'google',
        accessToken: accessToken
      }, { transaction: transaction }).then(function() {
        return done(null, user);
      });
    });
  });
}

/*
 * OAuth Strategy taken modified from https://github.com/sahat/hackathon-starter/blob/master/config/passport.js
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 *
 * The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. 
 * The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well
 * as options specifying a client ID, client secret, and callback URL.
 */
module.exports = new GoogleStrategy({
	clientID: secrets.google.clientID,
	clientSecret: secrets.google.clientSecret,
	callbackURL: secrets.google.callbackURL
}, function(req, accessToken, refreshToken, profile, done) {
  return User.findOne({ where: { google: profile.id } }).then(function(existingUser) {
    if (req.user) {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'});
      }
      return User.findById(req.user.id).then(function(user) {
        return attachGoogleAccount(user, profile, accessToken, done);
      });
    } else {
      if (existingUser) return done(null, existingUser);
      return User.findOne({ where: { email: profile._json.emails[0].value } }).then(function(existingEmailUser) {
        if (existingEmailUser) {
          return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.'});
        } else {
          // TODO: accesstoken was null but req looked like one...?
          return createUserWithToken(profile, req, done);
        }
      });
    }
  }).catch(function(err) {
    return done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
});
