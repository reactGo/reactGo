/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
*/

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

/*
By default, LocalStrategy expects to find credentials in parameters named username and password.
If your site prefers to name these fields differently, options are available to change the defaults.
*/
module.exports = new LocalStrategy({
	usernameField = 'email',
	passwordField = 'password'
}, function(email, password, done) {
	var options = {
		criteria : { email: email },
		select : 'name username email hashed_password salt'
	};
	// Define a load method
	User.load(options, function(err, user) {
		if(err) return done(err);
		if(!user) {
			return done(null, false, { message: 'Unknown user'});
		}
		if(!user.authenticated(password)) {
			return done(null, false, { message: 'Invalid password' });
		}
		return done(null, user);
	});
});