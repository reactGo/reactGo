import { voteService } from 'services';

const fetchData = ({ api }) => {
  return voteService.getTopics(api)
          .then(res => res.data);
};

export default fetchData;
