var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = mongoose.model('User');

/*
 * Expose
 */
module.exports = new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
}, function(accessToken, refreshToken, profile, done) {
  var options = {
    criteria:  { 'google.id' : profile.id }
  };
  // Todo: add the proper function
});
