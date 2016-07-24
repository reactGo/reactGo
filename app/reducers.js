import { combineReducers } from 'redux';
import user from 'users/reducer';
import topic from 'topics/reducer';
import message from 'messages/reducer';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  topic,
  message,
  routing
});

export default rootReducer;
