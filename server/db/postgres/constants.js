import { ENV } from '../../config/appConfig';

export const db = process.env.POSTGRES_DB_URL || `postgres://root:@localhost/react_webpack_node_${ENV}`;

export default {
  db
};
