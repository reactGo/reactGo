var mongoose = require('mongoose');
var User = require('../models/user');

module.exports = function(email, password, done) {
  User.findOne({ email: email}, function(err, user) {
    if(!user) return done(null, false, { message: 'There is no record of the email ' + email + '.'});
    user.comparePassword(password, function(err, isMatch) {
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Your email or password combination is not correct.'});
      }
    });
  });
};
