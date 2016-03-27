/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models').User;

/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
module.exports = new LocalStrategy({
  usernameField : 'email'
}, function(email, password, done) {
  User.findOne({ where: { email: email } }).then(function(user) {
    if(!user) return done(null, false, { message: 'There is no record of the email ' + email + '.' });
    user.comparePassword(password, function(err, isMatch) {
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Your email or password combination is not correct.' });
      }
    });
  }).catch(function(err) {
    return done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
});
