const appConfig = require('../config/appConfig');
const DB_TYPES = require('../config/constants').DB_TYPES;

let dbConfig = null;

switch (appConfig.DB_TYPE) {
  case DB_TYPES.MONGO:
    dbConfig = require('./mongo');
    break;
  case DB_TYPES.NONE:
    dbConfig = require('./none');
    break;
  default:
    throw new Error(`No database type '${appConfig.DB_TYPE}' found`);
}

module.exports = dbConfig;
