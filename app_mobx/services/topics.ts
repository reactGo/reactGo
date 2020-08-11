import axios from 'axios';

export default () => {
  return {
    getTopics: () => axios.get('/topic'),
    deleteTopic: ({ id }) => axios.delete(`/topic/${id}`),
    updateTopic: ({ id, data }) => axios.put(`/topic/${id}`, data),
    createTopic: ({ id, data }) => axios.post(`/topic/${id}`, data),
  };
};
