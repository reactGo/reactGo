import User from '../models/users';

export default async (email: string, password: string, done: (err: any, user?: any, info?: { message: string }) => void) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
    const result = await user.comparePassword(password);
    console.log('result', result);
    if (result) done(null, user);
    else done(null, false, { message: 'Your email/password combination is incorrect.' });
  } catch (err) {
    console.log(err);
    done(null, false, { message: 'Something went wrong trying to authenticate' });
  }
};
