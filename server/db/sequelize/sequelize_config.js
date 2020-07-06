const { DB_TYPE } = require('../../../config/serverEnv');
const { DB_TYPES } = require('../../../config/dbTypes');

switch (DB_TYPE) {
  case DB_TYPES.POSTGRES:
    module.exports = require('../postgres/sequelize_config');
    break;
  case DB_TYPES.MYSQL:
    module.exports = require('../mysql/sequelize_config');
    break;
  default:
    throw new Error(`No sequelize config found for db type '${DB_TYPE}'`);
}
