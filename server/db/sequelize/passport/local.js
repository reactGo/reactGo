import { Models } from '../models';

const User = Models.User;

export default (email, password, done) =>
  User.findOne({ where: { email } }).then((user) => {
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    return user.comparePassword(password).then(
      (result) => {
        if (result) done(null, user);
        else done(null, false, { message: 'Your email/password combination is incorrect.' });
    });
  }).catch((err) => {
    console.log(err);
    done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
