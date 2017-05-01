import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getTopics: () => client.request({
      method: 'GET',
      url: '/topic'
    }),
    deleteTopic: ({ id }) => client.request({
      method: 'DELETE',
      url: `/topic/${id}`
    }),
    updateTopic: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/topic/${id}`,
      data
    }),
    createTopic: ({ id, data }) => client.request({
      method: 'POST',
      url: `/topic/${id}`,
      data
    })
  };
};

