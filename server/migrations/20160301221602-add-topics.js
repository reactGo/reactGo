'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Topics', {
        id: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        text: {
          type: DataTypes.STRING
        },
        count: {
          type: DataTypes.INTEGER
        },
        date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.fn('NOW')
        }
      }
    );
  },

  down: function (queryInterface, DataTypes) {
    return queryInterface.dropTable('Topics');
  }
};
