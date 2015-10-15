import { combineReducers } from 'redux';
import user from './user';
import topics from './topics';
import { routerStateReducer as router } from 'redux-router';

const rootReducer = combineReducers({
  user,
  topics,
  router
});

export default rootReducer;
