import axios from 'axios';

interface Topic {
  id: string;
  text: string;
  count: number;
}
export default () => {
  return {
    getTopics: () => axios.get('/topic'),
    deleteTopic: ({ id }: { id: string }) => axios.delete(`/topic/${id}`),
    updateTopic: ({ id, data }: { id: string, data: { isFull: boolean, isIncrement: boolean } }) => axios.put(`/topic/${id}`, data),
    createTopic: ({ id, data }: { id: string, data: Topic }) => axios.post(`/topic/${id}`, data),
  };
};
