import User from '../models/users';

export default (email: string, password: string, done: (err: any, user?: any, info?: { message: string }) => void) => {
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    return user.comparePassword(password).then(
      (result) => {
        if (result) done(null, user);
        else done(null, false, { message: 'Your email/password combination is incorrect.' });
      },
    );
  }).catch((err: Error) => {
    console.log(err);
    done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
};
