import User from '../models/users';

export default (id: number, done: (error: any, user?: User | null) => void) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  }).catch(done);
};
