import { MemoryStore } from 'express-session';

const connect = () => {};
const controllers = () => {};
const passport = () => {};
const session = () => new MemoryStore();

export { connect, controllers, passport, session };
