import { ENV } from '../../config/appConfig';
import sequelizeConfig from './sequelize_config';
const config = sequelizeConfig[ENV];

export const db = process.env[config.use_env_variable] || `${config.dialect}://${config.username}:${config.password}@${config.host}/${config.database}`;

export default {
  db
};
