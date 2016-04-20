import session from 'express-session';
import pg from 'pg';
import connectPostgres from 'connect-pg-simple';
import { db } from '../sequelize/constants';

const PGStore = connectPostgres(session);

export default () =>
  new PGStore(
    {
      pg,
      conString: db
    }
  );
