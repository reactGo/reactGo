/**
 * Routes for express app
 */
import topics from '../controllers/topics';
var passport = require('passport');
var users = require('../controllers/users');
var path = require('path');
var compiledAppModulePath = path.resolve(__dirname, '../../', 'public', 'assets', 'server.js');
var App = require(compiledAppModulePath);

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
