import User from '../models/user';

export default (email, password, done) => {
  User.findOne({ email }, (findErr, user) => {
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    return user.comparePassword(password, (passErr, isMatch) => {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Your email or password combination is not correct.' });
    });
  });
};
