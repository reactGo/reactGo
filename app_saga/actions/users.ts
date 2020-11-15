import * as types from '../types';

export function beginLogin(data: { email: string; password: string }) {
  return { type: types.LOGIN_USER_REQUEST, data };
}

export function loginSuccess(message: string) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    message
  };
}

export function loginError(message: string) {
  return {
    type: types.LOGIN_USER_FAILURE,
    message
  };
}

export function signUpError(message: string) {
  return {
    type: types.SIGNUP_USER_FAILURE,
    message
  };
}

export function beginSignUp(data: { email: string; password: string }) {
  return { type: types.SIGNUP_USER_REQUEST, data };
}

export function signUpSuccess(message: string) {
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

export function logoutError(error: string) {
  return { type: types.LOGOUT_USER_FAILURE, error };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}
