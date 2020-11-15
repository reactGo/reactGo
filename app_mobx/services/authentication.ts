import axios from 'axios';

export default () => {
  return {
    login: ({ email, password }: { email: string, password: string }) => axios.post('/sessions', { email, password }),
    signUp: ({ email, password }: { email: string, password: string }) => axios.post('/users', { email, password }),
    logOut: () => axios.delete('/sessions')
  };
};
