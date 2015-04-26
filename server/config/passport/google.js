var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google').Strategy;
var User = require('../../models/user');

/*
 * When using Google for sign in, your application must implement a return URL, to which Google will redirect users
 * after they are authenticated. The `realm` indicates the part of the URL-space for which authentication is valid.
 * Typically this will be the root URL of your website.
 *
 * The verifier callback for Google authentication accepts `identifier` and `profile` arguments. `profile` will contai
 * user profile information provided by Google.
 */
module.exports = new GoogleStrategy({
	returnURL: 'http://localhost:3000/auth/google/return',
	realm: 'http://localhost:3000'
}, function(identifier, profile, done) {
	User.findOrCreate({ openID: identifier}, function(err, user) {
		done(err, user);
	});
});
