import axios from 'axios';

export default () => {
  return {
    getTopics: () => axios.get('/topic'),
    deleteTopic: ({ id }: { id: string }) => axios.delete(`/topic/${id}`),
    updateTopic: ({ id, data }: { id: string, data: any }) => axios.put(`/topic/${id}`, data),
    createTopic: ({ id, data }: { id: string, data: any }) => axios.post(`/topic/${id}`, data),
  };
};
