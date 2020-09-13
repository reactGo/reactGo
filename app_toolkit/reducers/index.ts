import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

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

export type RootState = ReturnType<ReturnType<typeof createRootReducer>>;

export default createRootReducer;
