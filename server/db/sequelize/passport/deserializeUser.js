import { Models } from '../models';

const User = Models.User;

export default (id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  }).catch(done);
};
