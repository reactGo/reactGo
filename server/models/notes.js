var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize');

var Note = sequelize.define('Note', {
	email: Sequelize.STRING,
  id: Sequelize.STRING,
  title: Sequelize.STRING,
  description: Sequelize.STRING
});

module.exports = Note;