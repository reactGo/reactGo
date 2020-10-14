module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Tokens', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        kind: {
          type: DataTypes.STRING,
          allowNull: false
        },
        accessToken: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        }
      }
    );
  },

  down(queryInterface) {
    return queryInterface.dropTable('Tokens');
  }
};
