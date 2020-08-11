export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/ReactGo';

export default {
  db
};
