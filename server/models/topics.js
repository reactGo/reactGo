/**
 * Schema Definitions
 *
 */
var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize');

var Topic = sequelize.define('Topic', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  text: Sequelize.STRING,
  count: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: sequelize.fn('NOW')
  }
}, {
	freezeTableName: true // model tableName will be the same as the model name
});

module.exports = Topic;
