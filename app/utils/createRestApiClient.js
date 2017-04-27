import axios from 'axios';
import { polyfill } from 'es6-promise';

polyfill();

class RestApiClient {
  constructor(config) {
    this.client = axios.create(config);
  }

  request(options) {
    return this.client.request(options);
  }
}

const createRestApiClient = () => ({
  withConfig: config => new RestApiClient(config)
});

export default createRestApiClient;

