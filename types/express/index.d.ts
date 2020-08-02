import User from '../../server/db/sequelize/models/users';

declare module 'express-serve-static-core' {
  interface Request {
    user: User;
  }
}
