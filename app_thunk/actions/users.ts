import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { authService } from '../services';
import * as types from '../types';
import { getTopics } from './topics';

function beginLogin() {
  return { type: types.LOGIN_USER_REQUEST };
}

function loginSuccess(message: string) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    message
  };
}

function loginError(message: string) {
  return {
    type: types.LOGIN_USER_FAILURE,
    message
  };
}

function signUpError(message: string) {
  return {
    type: types.SIGNUP_USER_FAILURE,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER_REQUEST };
}

function signUpSuccess(message: string) {
  return {
    type: types.SIGNUP_USER_SUCCESS,
    message
  };
}

function beginLogout() {
  return { type: types.LOGOUT_USER_REQUEST};
}

function logoutSuccess() {
  return { type: types.LOGOUT_USER_SUCCESS };
}

function logoutError() {
  return { type: types.LOGOUT_USER_FAILURE };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin(data: { email: string, password: string }) {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(beginLogin());

    return authService().login(data)
      .then(() => {
          dispatch(loginSuccess('You have been successfully logged in'));
          dispatch(getTopics());
          dispatch(push('/'));
      })
      .catch(() => {
        dispatch(loginError('Oops! Invalid username or password'));
      });
  };
}

export function signUp(data: { email: string, password: string }) {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(beginSignUp());

    return authService().signUp(data)
      .then(() => {
          dispatch(signUpSuccess('You have successfully registered an account!'));
          dispatch(push('/'));
      })
      .catch(() => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function logOut() {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then(() => {
          dispatch(logoutSuccess());
      })
      .catch(() => {
        dispatch(logoutError());
      });
  };
}
