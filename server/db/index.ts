import { DB_TYPES } from '../../config/dbTypes';
import { DB_TYPE } from '../../config/serverEnv';

let dbConfig = null;

/* use inline requires for conditional loading */
switch (DB_TYPE) {
  case DB_TYPES.MONGO:
    dbConfig = require('./mongo').default;
    break;
  case DB_TYPES.POSTGRES:
    dbConfig = require('./postgres').default;
    break;
  case DB_TYPES.MYSQL:
    dbConfig = require('./mysql').default;
    break;
  case DB_TYPES.NONE:
    dbConfig = require('./none').default;
    break;
  default:
    throw new Error(`No database type '${DB_TYPE}' found`);
}

export const {
  connect, controllers, passport, session,
} = dbConfig;
