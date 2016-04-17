const DB_TYPES = require('./constants').DB_TYPES;

/*
 * Set DB_TYPE to a database of your choice:
 * - MONGO: MongoDB
 * - POSTGRES: Postgresql
 * - NONE: There is no DB connection
 */

/* Use this old export style until sequelize cli supports es6 syntax */
function defaultExport() {}

defaultExport.DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO;
defaultExport.ENV = process.env.NODE_ENV;

module.exports = defaultExport;
