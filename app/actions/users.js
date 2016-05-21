import { request } from './network';
import * as types from '../types/user';

function signIn(data) {
  return request(types.SIGNIN, {
    method: 'post',
    url: '/login',
    withCredentials: true,
    data
  });
}

function signUp(data) {
  return request(types.SIGNUP, {
    method: 'post',
    url: '/signup',
    withCredentials: true,
    data
  });
}

export function signOut() {
  return request(types.SIGNOUT, {
    method: 'post',
    url: '/logout'
  });
}

export function signWith(credentials, isLogin) {
  return isLogin ? signIn(credentials) : signUp(credentials);
}
