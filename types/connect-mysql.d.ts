declare module "connect-mysql" {
  import { RequestHandler } from 'express';
  import { SessionOptions, Store } from 'express-session';

  class MySQLStore extends Store {
    constructor(options?: {
      config: {
        user: string;
        password: string;
        database: string;
      }
    });
    close(): void;
  }

  function ConnectMySQL (session: (options?: SessionOptions) => RequestHandler): typeof MySQLStore

  export default ConnectMySQL;
}
