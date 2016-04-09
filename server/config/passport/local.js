/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models').User;

/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently,
 options are available to change the defaults.
 */
module.exports = new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) =>
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    return user.comparePassword(password).then(
      () => done(null, user),
      () => done(null, false, { message: 'Your email/password combination is incorrect.' })
    );
  }).catch((err) => {
    console.log(err);
    done(null, false, { message: 'Something went wrong trying to authenticate' });
  })
);
