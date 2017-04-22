import { baseURL } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL });
  return {
    getTopics: () => client.request({
      method: 'GET',
      url: '/topic'
    })
  };
};

