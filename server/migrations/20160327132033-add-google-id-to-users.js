module.exports = {
  up(queryInterface, DataTypes) {
    queryInterface.addColumn('Users', 'google', DataTypes.STRING);
  },

  down(queryInterface) {
    queryInterface.removeColumn('Users', 'google');
  }
};
