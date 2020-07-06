const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.PGUSER || 'root',
    password: process.env.PGPASS || null,
    database: 'reactgo_development',
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
    database: 'reactgo_production',
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};
