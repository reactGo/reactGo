var User = require('../models/user');

module.exports = function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
};
