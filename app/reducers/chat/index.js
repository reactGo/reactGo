
import {
  USER_ADD_USER_LIST,
  USER_JOINED,
  USER_ADD_SELF,
  USER_LEFT,
  COMPOSE_CHAT,
  RECEIVE_CHAT
} from 'types';


export const removeAUser = (username, userList) => {

  let index = userList.findIndex( (item) => {
    return item === username
  });

  console.log('remove index', index);
  const firstList = userList.slice(0, index);
  const lastList  = userList.slice(index, userList.length-1);

  console.log('firstList', firstList);
  console.log('lastList', lastList);
  return [].concat(firstList, lastList);

}

const chat = (state = {
  messages:[],
  users:[],
  myMessage:''
}, action = {}) => {

  switch (action.type) {


    case USER_ADD_SELF:
      return Object.assign (
        {},
        state,
        {self: action.self}
      );

    case USER_ADD_USER_LIST:
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

    case USER_LEFT:
      console.log('REMOVE USER');
      return Object.assign({}, state,
        { users: removeAUser(action.user, state.users) }
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
