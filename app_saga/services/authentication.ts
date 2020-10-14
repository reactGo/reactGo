import axios from 'axios';

interface UserData {
  email: string,
  password: string,
}
export default () => {
  return {
    login: ({ email, password }: UserData) => axios.post('/sessions', { email, password }),
    signUp: ({ email, password }: UserData) => axios.post('/users', { email, password }),
    logOut: () => axios.delete('/sessions')
  };
};
