import { DB_TYPE } from '../../config/env';
import { DB_TYPES } from '../../config/dbTypes';

let dbConfig = null;

/* use inline requires for conditional loading */
switch (DB_TYPE) {
  case DB_TYPES.MONGO:
    dbConfig = require('./mongo').default;
    break;
  case DB_TYPES.POSTGRES:
    dbConfig = require('./postgres').default;
    break;
  case DB_TYPES.NONE:
    dbConfig = require('./none').default;
    break;
  default:
    throw new Error(`No database type '${DB_TYPE}' found`);
}

export const connect = dbConfig.connect;
export const controllers = dbConfig.controllers;
export const passport = dbConfig.passport;
export const session = dbConfig.session;

