import { Models } from '../models';

const {User} = Models;

export default (id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  }).catch(done);
};
