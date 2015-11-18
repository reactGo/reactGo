import { combineReducers } from 'redux';
import user from 'reducers/user';
import topic from 'reducers/topic';
import { routerStateReducer as router } from 'redux-router';

const rootReducer = combineReducers({
  user,
  topic,
  router
});

export default rootReducer;
