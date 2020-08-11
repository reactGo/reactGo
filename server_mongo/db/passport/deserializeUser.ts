import User from '../models/user';

export default (id: string, done: (err: any, user?: any) => void) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
};
