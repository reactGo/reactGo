import { observable, action } from 'mobx';
import md5 from 'spark-md5';
import { voteService } from '../services';

export default (initalState) => {
  const topicStore = observable({
    topics: [],
    newTopic: '',
    ...initalState,
    typing: action((text) => {
      topicStore.newTopic = text;
    }),
    createTopic(text) {
      if (text.trim().length <= 0) return;
      const id = md5.hash(text);
      const data = {
        count: 1,
        id,
        text
      };
      if (topicStore.topics.filter((topicItem) => topicItem.id === id).length > 0) {
        return;
      }
      topicStore.newTopic = '';
      return voteService().createTopic({ id, data })
        .then((res) => {
          if (res.status === 200) {
            topicStore.topics.push({ id, count: 0, text });
          }
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        });
    },
    getTopics() {
      return voteService().getTopics()
        .then((res) => {
          topicStore.topics = res.data;
          return Promise.resolve();
        })
        .catch((error) => {
          console.error(error);
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
        .then(() => {
          const topic = topicStore.topics.find((v) => v.id === id);
          topic.count += 1;
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        });
    },
    decrementCount(id) {
      return voteService().updateTopic({
        id,
        data: {
          isFull: false,
          isIncrement: false
        }
      })
        .then(() => {
          const topic = topicStore.topics.find((v) => v.id === id);
          topic.count -= 1;
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        });
    },
    destroyTopic(id) {
      return voteService().deleteTopic({ id })
        .then(() => {
          const topicIndex = topicStore.topics.findIndex((v) => v.id === id);
          topicStore.topics.splice(topicIndex, 1);
        })
        .catch((error) => {
          console.error(error);
          return Promise.reject(error);
        });
    },
  });
  return topicStore;
};
