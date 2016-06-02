
import {
  USER_JOINED,
  USER_LEFT,
  COMPOSE_CHAT,
  RECEIVE_CHAT
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
    case RECEIVE_CHAT:
      return Object.assign({}, state,
        { messages: state.messages.concat(action.chat) }
      );
    default:
      return state;
  }

};

export default chat;
