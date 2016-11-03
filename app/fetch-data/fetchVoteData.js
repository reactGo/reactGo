import { voteService } from 'services';
import * as types from 'types';

const fetchData = () => {
  return {
    type: types.GET_TOPICS,
    promise: voteService.getTopics()
  }
};

export default fetchData;
