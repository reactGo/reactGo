import { Model, Sequelize, DataTypes } from 'sequelize';
import { dbType } from './index';

class Token extends Model {
  static initWithSequelize(sequelize: Sequelize) {
    return Token.init({
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
    });
  }

  static associate = (models: dbType) => {
    models.Token.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
}

export default Token;
