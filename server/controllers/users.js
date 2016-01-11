var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');

/**
 * POST /login
 */
exports.postLogin = function(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    if(!user) {
      req.flash('errors', {msg: info.message});
    }
    // Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
    req.logIn(user, function(err) {
      if(err) return next(err);
    });
    res.status(200).send('OK');
  })(req, res, next);
};


/**
 * GET /logout
 */
exports.getLogout = function(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = function(req, res, next) {
  var user =  new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({email: req.body.email}, function(err, existingUser) {
    if(existingUser) {
      req.flash('errors', { msg: 'Account with that email address already exists' });
    }
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return next(err);
        console.log('Successfully created');
        res.end('Success');
      });
    });
  });
};
