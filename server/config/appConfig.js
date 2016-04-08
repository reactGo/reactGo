var DB_TYPE = require('./constants').DB_TYPE;

/*
 * Set DB_TYPE to a database of your choice:
 * - MONGO: MongoDB
 * - POSTGRES: Postgresql
 * - EMPTY: There is no DB
 */
module.exports = {
  DB_TYPE: process.env.DB_TYPE || DB_TYPE.MONGO,
  ENV: process.env.NODE_ENV
};

