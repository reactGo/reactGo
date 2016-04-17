export const db = process.env.POSTGRES_DB_URL || `postgres://root:@localhost/react_webpack_node_${process.env.NODE_ENV}`;

export default {
  db
};
