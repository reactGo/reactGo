import * as types from 'types';

export default function user(state = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false }, action = {}) {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return {...state, isLogin: !state.isLogin, message: ''};
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return {...state, isWaiting: true, message: ''};
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {...state, isWaiting: false, authenticated: true, message: ''};
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return {...state, isWaiting: false, authenticated: false, message: action.message};
    case types.LOGOUT_SUCCESS_USER:
      return {...state, isWaiting: false, authenticated: false, message: ''};
    case types.LOGOUT_ERROR_USER:
      return {...state, isWaiting: false, authenticated: true, isLogin: true};
    default:
      return state;
  }
}
