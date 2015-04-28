var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../models/user');
var secrets = require('../secrets');

/*
 * The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. 
 * The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well
 * as options specifying a client ID, client secret, and callback URL.
 */
module.exports = new GoogleStrategy({
	clientID: secrets.google.clientID,
	clientSecret: secrets.google.clientSecret,
	callbackURL: secrets.google.callbackURL
},  function(accessToken, refreshToken, profile, done) {
	    var options = {
	      criteria: { 'google.id': profile.id }
	    };
	    User.load(options, function (err, user) {
	      if (err) return done(err);
	      console.log(user);
	      if (!user) {
	        user = new User({
	          name: profile.displayName,
	          email: profile.emails[0].value,
	          username: profile.username,
	          provider: 'google',
	          google: profile._json
	        });
	        user.save(function (err) {
	          if (err) console.log(err);
	          return done(err, user);
	        });
	      } else {
	        return done(err, user);
	      }
	    });
});
