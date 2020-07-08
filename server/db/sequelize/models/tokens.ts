import { Model, Sequelize, DataTypes } from 'sequelize';

class Token extends Model {
  static init(sequelize: Sequelize) {
    return super.init({
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
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
      timestamps: false,
    })
  }

  static associate = (db) => {
    Token.belongsTo(db.User, {
      foreignKey: 'userId'
    });
  };
}
