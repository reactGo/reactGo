import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';
import topic from './topic';
import message from './message';
import * as types from '../types';

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_REQUEST:
      return true;
    case types.REQUEST_SUCCESS:
    case types.REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
};

// Combine reducers with routeReducer which keeps track of
// router state
const createRootReducer = (history) => combineReducers({
  isFetching,
  topic,
  user,
  message,
  router: connectRouter(history),
});

export default createRootReducer;
