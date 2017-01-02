import { DB_TYPE } from '../../../config/env';
import { DB_TYPES } from '../../../config/dbTypes';

switch (DB_TYPE) {
  case DB_TYPES.POSTGRES:
    module.exports = require('../postgres/sequelize_config');
    break;
  default:
    throw new Error(`No sequelize config found for db type '${DB_TYPE}'`);
}
