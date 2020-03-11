import session from 'express-session';
import connectMySQL from 'connect-mysql';
import config from '../sequelize/sequelize_config';

const MySQLStore = connectMySQL(session);

export default () => new MySQLStore({
  config: {
    user: config[process.env.NODE_ENV].username,
    password: config[process.env.NODE_ENV].password,
    database: config[process.env.NODE_ENV].database,
  },
});
