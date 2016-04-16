import { DB_TYPES } from './constants';

/*
 * Set DB_TYPE to a database of your choice:
 * - MONGO: MongoDB
 * - POSTGRES: Postgresql
 * - NONE: There is no DB connection
 */
export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO;
export const ENV = process.env.NODE_ENV;

export default {
  DB_TYPE,
  ENV
};

