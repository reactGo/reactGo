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
  LOGOUT_ERROR_USER } from 'constants/index';

export default function user(state = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false }, action = {}) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODE:
      return Object.assign({}, state, {
        isLogin: !state.isLogin,
        message: ''
      });
    case MANUAL_LOGIN_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        message: ''
      });
    case LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case SIGNUP_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case SIGNUP_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case SIGNUP_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case LOGOUT_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        isLogin: true
      });
    default:
      return state;
  }
}
