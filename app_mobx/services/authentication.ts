import axios from 'axios';

export default () => {
  return {
    login: ({ email, password }) => axios.post('/sessions', { email, password }),
    signUp: ({ email, password }) => axios.post('/users', { email, password }),
    logOut: () => axios.delete('/sessions')
  };
};
