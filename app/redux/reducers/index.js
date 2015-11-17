import { combineReducers } from 'redux';
import user from './user';
import topic from './topic';
import { routerStateReducer as router } from 'redux-router';

const rootReducer = combineReducers({
  user,
  topic,
  router
});

export default rootReducer;
