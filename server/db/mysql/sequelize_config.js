const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASS || null,
    database: 'react_webpack_node_development',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASS || null,
    database: 'react_webpack_node_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASS || null,
    database: 'react_webpack_node_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
