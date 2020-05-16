import { observable } from 'mobx';
import md5 from 'spark-md5';
import { voteService } from '../services';

export default observable({
  topics: [],
  newTopic: '',
  typing(text) {
    this.newTopic = text;
  },
  createTopic(text) {
    if (text.trim().length <= 0) return;
    const id = md5.hash(text);
    const data = {
      count: 1,
      id,
      text
    };
    if (this.topics.filter((topicItem) => topicItem.id === id).length > 0) {
      // createTopicDuplicate
    }
    return voteService().createTopic({ id, data })
      .then((res) => {
        if (res.status === 200) {}
      })
      .catch(() => {

      });
  },
  getTopics() {
    return voteService().getTopics()
      .then((res) => {
        return Promise.resolve();
      })
      .catch((error) => {

        return Promise.reject(error);
      });
  },
  incrementCount(id) {
    return voteService().updateTopic({
      id,
      data: {
        isFull: false,
        isIncrement: true
      }
    })
  },
  decrementCount(id) {
    return voteService().updateTopic({
      id,
      data: {
        isFull: false,
        isIncrement: false
      }
    });
  },
  destroyTopic(id) {
    return voteService().deleteTopic({ id })
  },
});
