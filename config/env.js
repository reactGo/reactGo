import { DB_TYPES } from './dbTypes';

export const HOST = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';
export const ENV = process.env.NODE_ENV || 'development';


export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO; // Supported: DB_TYPES.MONGO|POSTGRES|NONE


export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

