'use strict';

module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable(
      'Users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING
        },
        name: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        gender: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        location: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        website: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        picture: {
          type: DataTypes.STRING,
          defaultValue: ''
        },
        resetPasswordToken: {
          type: DataTypes.STRING
        },
        resetPasswordExpires: {
          type: DataTypes.DATE
        }
      }, {
        indexes: [
          {
            name: 'unique_email',
            unique: true,
            fields: [DataTypes.fn('lower', DataTypes.col('email'))]
          }
        ]
      }
    );
  },

  down: function (queryInterface, DataTypes) {
    return queryInterface.dropTable('Users');
  }
};
