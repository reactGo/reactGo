import { Sequelize } from 'sequelize';
import sequelizeConfig from '../sequelize_config';
import { ENV } from '../../../../config/env';
import tokenModel from './tokens';
import topicModel from './topics';
import userModel from './users';

const config = sequelizeConfig[ENV];

const db = {};
const dbUrl = process.env[config.use_env_variable];

const sequelize = dbUrl ? new Sequelize(dbUrl) : new Sequelize(config.database, config.username, config.password, config);

const db = {
  User: userModel,
  Token: tokenModel,
  Topic: topicModel,
} as const;
export type dbType = typeof db;

Object.keys(db).forEach((key) => {
  const model = db[key as keyof dbType];
  model.initWithSequelize(sequelize);
});

Object.keys(db).forEach((key) => {
  const model = db[key as keyof dbType];
  if (model.associate) {
    model.associate(db);
  }
});

export { db as Models, sequelize };
