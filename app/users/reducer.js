import {
  TOGGLE_LOGIN_MODE,
  MANUAL_LOGIN_USER,
  LOGIN_SUCCESS_USER,
  LOGIN_ERROR_USER,
  SIGNUP_USER,
  SIGNUP_SUCCESS_USER,
  SIGNUP_ERROR_USER,
  LOGOUT_USER,
  LOGOUT_SUCCESS_USER,
  LOGOUT_ERROR_USER } from './actions';
import { combineReducers } from 'redux';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODE:
    case MANUAL_LOGIN_USER:
    case SIGNUP_USER:
    case LOGOUT_USER:
    case LOGIN_SUCCESS_USER:
    case SIGNUP_SUCCESS_USER:
      return '';
    case LOGIN_ERROR_USER:
    case SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case MANUAL_LOGIN_USER:
    case SIGNUP_USER:
    case LOGOUT_USER:
      return true;
    case LOGIN_SUCCESS_USER:
    case SIGNUP_SUCCESS_USER:
    case LOGOUT_SUCCESS_USER:
    case LOGIN_ERROR_USER:
    case SIGNUP_ERROR_USER:
    case LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS_USER:
    case SIGNUP_SUCCESS_USER:
    case LOGOUT_ERROR_USER:
      return true;
    case LOGIN_ERROR_USER:
    case SIGNUP_ERROR_USER:
    case LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  message
});

export default userReducer;
