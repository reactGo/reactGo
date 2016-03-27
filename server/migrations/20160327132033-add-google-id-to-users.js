'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    queryInterface.addColumn('Users', 'google', DataTypes.STRING);
  },

  down: function (queryInterface, DataTypes) {
    queryInterface.removeColumn('Users', 'google');
  }
};
