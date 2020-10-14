import axios from 'axios';

import { apiEndpoint } from '../../config/app';

axios.defaults.baseURL = apiEndpoint;

export { default as voteService } from './topics';
export { default as authService } from './authentication';
