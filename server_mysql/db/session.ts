import * as session from 'express-session';
import sessionSequelize from 'connect-session-sequelize';
import { sequelize } from './sequelize/models';

const SequelizeStore = sessionSequelize(session.Store);

export default () => new SequelizeStore({
  db: sequelize,
});
