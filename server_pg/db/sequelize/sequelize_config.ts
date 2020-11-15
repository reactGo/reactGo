import dotenv from 'dotenv';

dotenv.config();

type SequelizeConfig = {
  development: any;
  test: any;
  production: any;
};

const exportedConfig: SequelizeConfig = {
  development: {
    username: process.env.PGUSER || 'root',
    password: process.env.PGPASS || null,
    database: process.env.PGDB || 'reactgo_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER || 'root',
    password: process.env.PGPASS || null,
    database: 'reactgo_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL',
    username: process.env.PGUSER || 'root',
    password: process.env.PGPASS || null,
    database: process.env.PGDB || 'reactgo_production',
    host: process.env.PGHOST || '127.0.0.1',
    dialect: 'postgres'
  }
} as const;

export default exportedConfig;
