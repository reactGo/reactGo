import * as types from '../types/user';

export default function user(
  state = {
    isLogin: true,
    isWaiting: false,
    authenticated: false
  },
  action = {}
) {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return Object.assign({}, state, {
        isLogin: !state.isLogin
      });
    case types.MANUAL_LOGIN_USER:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case types.LOGIN_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case types.LOGIN_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case types.SIGNUP_USER:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case types.SIGNUP_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case types.SIGNUP_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case types.LOGOUT_USER:
      return Object.assign({}, state, {
        isWaiting: true
      });
    case types.LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case types.LOGOUT_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        isLogin: true
      });
    default:
      return state;
  }
}
