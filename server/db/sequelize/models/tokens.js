export default (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    kind: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: false,

    classMethods: {
      associate(models) {
        Token.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });

  return Token;
};
