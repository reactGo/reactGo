import { create, destroy, update, fetch } from './network';
import * as types from '../types/user';

function signIn(data) {
  return create(types.SIGNIN_REQUEST, {
    url: '/login',
    withCredentials: true,
    data
  });
}

function signUp(data) {
  return create(types.SIGNUP_REQUEST, {
    url: '/signup',
    withCredentials: true,
    data
  });
}

export function signOut() {
  return create(types.SIGNOUT_REQUEST, {
    url: '/logout'
  });
}

export function signWith(credentials, isLogin) {
  return isLogin ? signIn(credentials) : signUp(credentials);
}
