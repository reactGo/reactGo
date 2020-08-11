import session from 'express-session';
import connectPostgres from 'connect-pg-simple';
import { db } from './sequelize/constants';

const PGStore = connectPostgres(session);

export default () => new PGStore({
  conString: db,
});
