import * as types from '../types';

export function beginLogin() {
  return { type: types.LOGIN_USER_REQUEST };
}

export function loginSuccess(message) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    message
  };
}

export function loginError(message) {
  return {
    type: types.LOGIN_USER_FAILURE,
    message
  };
}

export function signUpError(message) {
  return {
    type: types.SIGNUP_USER_FAILURE,
    message
  };
}

export function beginSignUp() {
  return { type: types.SIGNUP_USER_REQUEST };
}

export function signUpSuccess(message) {
  return {
    type: types.SIGNUP_USER_SUCCESS,
    message
  };
}

export function beginLogout() {
  return { type: types.LOGOUT_USER_REQUEST};
}

export function logoutSuccess() {
  return { type: types.LOGOUT_USER_SUCCESS };
}

export function logoutError() {
  return { type: types.LOGOUT_USER_FAILURE };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}
