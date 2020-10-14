import { RouterStore } from 'mobx-react-router';
import createUserStore, { UserStore } from './user';
import createTopicStore, { TopicStore } from './topic';
import createMessageStore, { MessageStore } from './message';

export const routingStore = new RouterStore();

export interface Store {
  userStore: UserStore,
  topicStore: TopicStore,
  messageStore: MessageStore,
  routingStore: RouterStore,
}

export default (initialState: Store) => {
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
