const DB_TYPE = require('../../config/appConfig').DB_TYPE;
const DB_TYPES = require('../../config/constants').DB_TYPES;

switch (DB_TYPE) {
  case DB_TYPES.POSTGRES:
    module.exports = require('../postgres/sequelize_config');
    break;
  default:
    throw new Error(`No sequelize config found for db type '${DB_TYPE}'`);
}
