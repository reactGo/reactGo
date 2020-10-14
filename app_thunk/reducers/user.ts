import { AnyAction, combineReducers } from 'redux';
import * as types from '../types';

const isLogin = (
  state = true,
  action: AnyAction
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action: AnyAction
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.LOGIN_USER_REQUEST:
    case types.SIGNUP_USER_REQUEST:
    case types.LOGOUT_USER_REQUEST:
    case types.SIGNUP_USER_SUCCESS:
      return '';
    case types.LOGIN_USER_FAILURE:
    case types.SIGNUP_USER_FAILURE:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action: AnyAction
) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
    case types.SIGNUP_USER_REQUEST:
    case types.LOGOUT_USER_REQUEST:
      return true;
    case types.SIGNUP_USER_SUCCESS:
    case types.LOGOUT_USER_SUCCESS:
    case types.LOGIN_USER_FAILURE:
    case types.SIGNUP_USER_FAILURE:
    case types.LOGOUT_USER_FAILURE:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action: AnyAction
) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
    case types.SIGNUP_USER_SUCCESS:
    case types.LOGOUT_USER_FAILURE:
      return true;
    case types.LOGIN_USER_FAILURE:
    case types.SIGNUP_USER_FAILURE:
    case types.LOGOUT_USER_SUCCESS:
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
