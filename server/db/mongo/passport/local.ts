import User from '../models/user';

export default (email: string, password: string, done: (err: any, user?: any, info?: { message: string }) => void) => {
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
