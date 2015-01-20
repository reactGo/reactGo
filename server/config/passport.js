/* Initializing passport.js */
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy; // what is this for?
var User = mongoose.model('User');

var local = require('./passport/local');
var google = require('./passport/google');

/*
 * Expose
 */
 module.exports = function(passport, config) {
 	// serialize sessions
 	passport.serializeUser(function(user, done) {
 		done(null, user.id);
 	});

 	passport.deserializeUser(function(id, done) {
 		User.load({
 			criteria: { _id: id }
 		}, function(err, user) {
 			done(err, user);
 		});
 	});

 	// use the following strategies
 	passport.use(local);
 	passport.use(google);
 };