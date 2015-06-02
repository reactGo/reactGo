var Note = require('../models/notes');

exports.create = function(req, res) {
  // sequelize.sync() will, based on your model definitions, create any missing tables.
  // If force: true it will first drop tables before recreating them.
  Note.sync().then(function() {
    return Note.findOrCreate({where: {
              uid: req.user.id,
              id: req.body.id
            }, defaults: {
              title: req.body.title,
              description: req.body.description
            }})
          .spread(function(note, created) {
            console.log(note.get({
              plain: true
            }));
            res.status(200).send('Successful');
          });
  });
};

exports.get = function(req, res) {
  Note.sync().then(function() {
    return Note.findAll({
            where: {
              uid: req.user.id
            }
          }).then(function(notes) {
            res.json(notes);
          });
  });
};

exports.remove = function(req, res) {
  Note.sync().then(function() {
    return Note.destroy({
            where: {
              uid: req.user.id,
              id: req.body.id
            }
          });
  });
};