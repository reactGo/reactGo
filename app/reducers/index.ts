import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

import user from './user';
import topic, { Topic } from './topic';
import message from './message';

// Combine reducers with connectRouter which keeps track of router state
const createRootReducer = (history: History) => combineReducers({
  topic,
  user,
  message,
  router: connectRouter(history),
});

export interface RootState {
  topic: {
    topics: Topic[];
    newTopic: string;
  },
  user: {
    authenticated: boolean;
    isWaiting: boolean;
    message: string;
    isLogin: boolean;
  },
  message: {
    type: string;
    message: string;
  },
  router: Reducer<RouterState>
}

export default createRootReducer;
