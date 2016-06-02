

import * as types from 'types';

export const userJoined = (user) => ({
  user,
  type: types.USER_JOINED
});

export const userLeft = (user) => ({
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
