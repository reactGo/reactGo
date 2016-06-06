
import * as types from 'types';


export const addSelf = (self) => ({
  self,
  type: types.USER_ADD_SELF
});

export const addUserList = (users) => ({
  users,
  type: types.USER_ADD_USER_LIST
});

export const addNewUser = (user) => ({
  user,
  type: types.USER_JOINED
});

export const removeUser = (user) => ({
  user,
  type: types.USER_LEFT
});

export const composeChat = (chat) => ({
  chat,
  type: types.COMPOSE_CHAT
});

export const receiveChat = (chat) => ({
  chat,
  type: types.RECEIVE_CHAT
});
