import dotenv from 'dotenv';

dotenv.config();

type SequelizeConfig = {
  development: any;
  test: any;
  production: any;
};

const exportedConfig: SequelizeConfig = {
  development: {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASS || null,
    database: 'reactgo_development',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASS || null,
    database: 'reactgo_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASS || null,
    database: 'reactgo_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
} as const;

export default exportedConfig;
