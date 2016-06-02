
import {
  USER_JOINED,
  USER_LEFT,
  UPDATE_MESSAGE
} from 'types';


const chat = (state = {
  messages:[],
  users:[],
  myMessage:''
}, action = {}) => {
  switch (action.type) {
  case USER_JOINED:
    return Object.assign({}, state,
      { users: state.users.concat(action.user) }
    );
    default:
      return state;
  }
};


export default chat;
