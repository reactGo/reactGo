import { MemoryStore } from 'express-session';

const connect = () => {};
const session = () => new MemoryStore();

export { connect, session };
export { default as passport } from './passport';
export { default as controllers } from './controllers';
