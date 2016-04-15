var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function(req, accessToken, refreshToken, profile, done) {
	if (req.user) {
		User.findOne({ google: profile.id }, function(err, existingUser) {
			if (existingUser) {
				return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'})
			} else {
				User.findById(req.user.id, function(err, user) {
					user.google = profile.id;
					user.tokens.push({ kind: 'google', accessToken: accessToken});
					user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.picture;
          user.save(function(err) {
            done(err, user, { message: 'Google account has been linked.' });
          });
				})
			}
		});
	} else {
		User.findOne({ google: profile.id }, function(err, existingUser) {
      if (existingUser) return done(null, existingUser);
      User.findOne({ email: profile._json.emails[0].value }, function(err, existingEmailUser) {
        if (existingEmailUser) {
          return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.'});
        } else {
          var user = new User();
          user.email = profile._json.emails[0].value;
          user.google = profile.id;
          user.tokens.push({ kind: 'google', accessToken: accessToken });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.picture;
          user.save(function(err) {
            done(err, user);
          });
        }
      });
    });
	}
};
