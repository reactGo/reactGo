module.exports = {
  up(queryInterface, DataTypes) {
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

  down(queryInterface) {
    return queryInterface.dropTable('Topics');
  }
};
