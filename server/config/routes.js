/**
 * Routes for express app
 */
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var topics = require('../controllers/topics');
var users = require('../controllers/users');
var Topic = mongoose.model('Topic');

module.exports = function(app) {
  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);
  app.post('/logout', users.postLogout);

  // google auth
  // Redirect the user to Google for authentication. When complete, Google
  // will redirect the user back to the application at
  // /auth/google/return
  // Authentication with google requires an additional scope param, for more info go
  // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
  app.get('/auth/google', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ] }));

  // Google will redirect the user to this URL after authentication. Finish the
  // process by verifying the assertion. If valid, the user will be logged in.
  // Otherwise, the authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

  // topic routes
  app.get('/topic', topics.all);

  app.post('/topic/:id', function(req, res) {
    topics.add(req, res);
  });

  app.put('/topic/:id', function(req, res) {
    topics.update(req, res);
  });

  app.delete('/topic/:id', function(req, res) {
    topics.remove(req, res);
  });

};
