const DB_TYPES = require('./constants').DB_TYPES;

/*
 * Set DB_TYPE to a database of your choice:
 * - MONGO: MongoDB
 * - POSTGRES: Postgresql
 * - NONE: There is no DB connection
 */
module.exports = {
  DB_TYPE: process.env.DB_TYPE || DB_TYPES.MONGO,
  ENV: process.env.NODE_ENV
};

