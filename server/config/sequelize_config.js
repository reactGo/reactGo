/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

module.exports = {
  development: {
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'react_webpack_node_development',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'react_webpack_node_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'POSTGRES_DB_URL'
  }
};
