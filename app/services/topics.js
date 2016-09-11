import axios from 'axios';

const service = {
  getTopics: () => axios.get('/topic')
};

export default service;

