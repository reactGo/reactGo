import dotenv from 'dotenv';
import { DB_TYPES } from './dbTypes';

dotenv.config();
export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO;
