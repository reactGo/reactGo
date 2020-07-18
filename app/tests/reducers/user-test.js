import expect from 'expect';
import reducer from '../../reducers/user';
import * as types from '../../types';

describe('Users reducer', () => {
  const initialState = {
    isLogin: true,
    message: '',
    isWaiting: false,
    authenticated: false
  };

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle MANUAL_LOGIN_USER', () => {
    expect(
      reducer(undefined, {type: types.MANUAL_LOGIN_USER})
    ).toEqual({
 ...initialState,
isWaiting: true,
      message: ''
});
  });

  it('should handle LOGIN_USER_REQUEST', () => {
    expect(
      reducer(undefined, {type: types.LOGIN_USER_REQUEST})
    ).toEqual({
 ...initialState,
isWaiting: false,
      authenticated: true,
      message: ''
});
  });

  it('should handle LOGIN_USER_FAILURE', () => {
    const message = 'Success';
    expect(
      reducer(undefined, {type: types.LOGIN_USER_FAILURE, message})
    ).toEqual({
 ...initialState,
isWaiting: false,
      authenticated: false,
      message
});
  });

  it('should handle SIGNUP_USER_REQUEST', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_USER_REQUEST})
    ).toEqual({
 ...initialState,
isWaiting: true,
      message: ''
});
  });

  it('should handle SIGNUP_USER_SUCCESS', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_USER_SUCCESS})
    ).toEqual({
 ...initialState,
isWaiting: false,
      authenticated: true
});
  });

  it('should handle SIGNUP_USER_FAILURE', () => {
    const message = 'Oops! Something went wrong!';
    expect(
      reducer(undefined, {type: types.SIGNUP_USER_FAILURE, message})
    ).toEqual({
 ...initialState,
isWaiting: false,
      authenticated: false,
      message
});
  });

  it('should handle LOGOUT_USER_REQUEST', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_USER_REQUEST})
    ).toEqual({
 ...initialState,
isWaiting: true,
      message: ''
});
  });

  it('should handle LOGOUT_USER_SUCCESS', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_USER_SUCCESS})
    ).toEqual({
 ...initialState,
isWaiting: false,
      authenticated: false
});
  });

  it('should handle LOGOUT_USER_FAILURE', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_USER_FAILURE})
    ).toEqual({
 ...initialState,
isWaiting: false,
      authenticated: true,
      isLogin: true
});
  });
});
