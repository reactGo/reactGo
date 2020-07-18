import session from 'express-session';
import connectMySQL from 'express-mysql-session';
import config from '../sequelize/sequelize_config';

const MySQLStore = connectMySQL(session);

export default () => new MySQLStore({
  host: config[process.env.NODE_ENV].host,
  user: config[process.env.NODE_ENV].username,
  password: config[process.env.NODE_ENV].password,
  database: config[process.env.NODE_ENV].database,
});
