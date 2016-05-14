import * as types from '../types/user';

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

function signIn(data) {
  return {
    types: [types.MANUAL_LOGIN_USER, types.LOGIN_SUCCESS_USER, types.LOGIN_ERROR_USER],
    payload: {
      request: {
        method: 'post',
        url: '/login',
        withCredentials: true,
        data
      }
    }
  }
}

function signUp(data) {
  return {
    types: [types.SIGNUP_USER, types.SIGNUP_SUCCESS_USER, types.SIGNUP_ERROR_USER],
    payload: {
      request: {
        method: 'post',
        url: '/signup',
        withCredentials: true,
        data
      }
    }
  }
}

export function signOut() {
  return {
    types: [types.LOGOUT_USER, types.LOGOUT_SUCCESS_USER, types.LOGOUT_ERROR_USER],
    payload: {
      request: {
        method: 'post',
        url: '/logout'
      }
    }
  }
}

export function signWithCredentials(data, isLogin) {
  return isLogin ? signIn(data) : signUp(data);
}
