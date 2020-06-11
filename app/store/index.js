import { RouterStore } from 'mobx-react-router';
import createUserStore from './user';
import createTopicStore from './topic';
import createMessageStore from './message';

export const routingStore = new RouterStore();

export default (initialState) => {
  const userStore = createUserStore(initialState.userStore);
  const topicStore = createTopicStore(initialState.topicStore);
  const messageStore = createMessageStore(initialState.messageStore);
  return ({
    userStore,
    topicStore,
    messageStore,
    routingStore,
  });
};
