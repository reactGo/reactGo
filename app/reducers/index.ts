import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';

import user from './user';
import topic from './topic';
import message from './message';

// Combine reducers with connectRouter which keeps track of router state
const createRootReducer = (history: History) => combineReducers({
  topic,
  user,
  message,
  router: connectRouter(history),
});

export interface RootState {
  topic: any,
  user: {
    authenticated: boolean;
  },
  message: {
    type: string;
    message: string;
  },
  router: Reducer<RouterState>
}

export default createRootReducer;
