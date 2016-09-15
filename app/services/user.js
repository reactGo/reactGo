import axios from 'axios';

const service = {
  isLoggedIn: () => axios.get('/topic')
};

export default service;
