
import {
  USER_LOGGED_ON,
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

    case USER_LOGGED_ON:
      console.log('LOGGED ON .users', action.users);
      return Object.assign (
        {},
        state,
        {users: action.users}
      );

    case USER_JOINED:
      console.log('NEW JOIN ');
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
