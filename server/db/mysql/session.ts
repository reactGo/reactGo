import * as session from 'express-session';
import connectMySQL from 'express-mysql-session';
import { ENV } from '../../../config/env';
import config from '../sequelize/sequelize_config';

const MySQLStore = connectMySQL(session);

export default () => new MySQLStore({
  host: config[ENV].host,
  user: config[ENV].username,
  password: config[ENV].password,
  database: config[ENV].database
});
