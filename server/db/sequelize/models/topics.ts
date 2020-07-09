import { Model, Sequelize, DataTypes } from 'sequelize';

class Topic extends Model {
  static initWithSequelize(sequelize: Sequelize) {
    return Topic.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      text: DataTypes.STRING,
      count: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0
        }
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    }, {
      sequelize,
      modelName: 'Topic',
      tableName: 'topics',
      timestamps: false,
    });
  }

  static associate() {}
}

export default Topic;
