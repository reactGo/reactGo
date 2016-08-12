import session from 'express-session';
import mysql from 'mysql';
import connectMysql from 'connect-mysql-store';
import { db } from '../sequelize/constants';

const MySQLStore = connectMysql(session);

export default () =>
    new MySQLStore(
        {
            mysql,
            conString: db
        }
    );
