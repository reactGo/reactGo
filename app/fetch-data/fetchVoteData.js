import { voteService } from 'services';

const fetchData = () => {
  return voteService.getTopics()
          .then(res => res.data);
};

export default fetchData;

