export default (email: string, password: string, done: (err: any, user?: any, info?: { message: string }) => void) => {
  done(null, { email, password });
};
