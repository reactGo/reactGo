'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable(
      'session', {
        sid: {
          type: DataTypes.STRING,
          primaryKey: true
        },
        sess: {
          type: DataTypes.JSON
        },
        expire: {
          type: DataTypes.DATE
        }
      }
    );
  },

  down: function (queryInterface, DataTypes) {
    return queryInterface.dropTable('session');
  }
};
