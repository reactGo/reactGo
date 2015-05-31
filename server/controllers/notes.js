var Note = require('../models/notes');

exports.create = function(req, res) {
  // sequelize.sync() will, based on your model definitions, create any missing tables.
  // If force: true it will first drop tables before recreating them.
  Note.sync()
      .findOrCreate({where: {
          email: req.user.email,
          id: req.body.id
        }, defaults: {
          title: req.body.title,
          description: req.body.desc
        }})
      .spread(function(note, created) {
        console.log(note.get({
          plain: true
        }));
        console.log(created)
      });
  console.log(req.user.email);
  // console.log(res);
};