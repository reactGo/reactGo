import { DB_TYPE } from '../../../config/serverEnv';
import { DB_TYPES } from '../../../config/dbTypes';
import postgresConfig from '../postgres/sequelize_config';
import mysqlConfig from '../mysql/sequelize_config';

type SequelizeConfig = {
  development: any;
  test: any;
  production: any;
};

let exportedConfig: SequelizeConfig;
switch (DB_TYPE) {
  case DB_TYPES.POSTGRES:
    exportedConfig = postgresConfig;
    break;
  case DB_TYPES.MYSQL:
    exportedConfig = mysqlConfig;
    break;
  default:
    throw new Error(`No sequelize config found for db type '${DB_TYPE}'`);
}

export default exportedConfig;
