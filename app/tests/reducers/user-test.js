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
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: true,
      message: ''
    }));
  });

  it('should handle LOGIN_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGIN_SUCCESS_USER})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: true,
      message: ''
    }));
  });

  it('should handle LOGIN_ERROR_USER', () => {
    const message = 'Success';
    expect(
      reducer(undefined, {type: types.LOGIN_ERROR_USER, message})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: false,
      message
    }));
  });

  it('should handle SIGNUP_USER', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_USER})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: true,
      message: ''
    }));
  });

  it('should handle SIGNUP_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.SIGNUP_SUCCESS_USER})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: true
    }));
  });

  it('should handle SIGNUP_ERROR_USER', () => {
    const message = 'Oops! Something went wrong!';
    expect(
      reducer(undefined, {type: types.SIGNUP_ERROR_USER, message})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: false,
      message
    }));
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_USER})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: true,
      message: ''
    }));
  });

  it('should handle LOGOUT_SUCCESS_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_SUCCESS_USER})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: false
    }));
  });

  it('should handle LOGOUT_ERROR_USER', () => {
    expect(
      reducer(undefined, {type: types.LOGOUT_ERROR_USER})
    ).toEqual(Object.assign({}, initialState, {
      isWaiting: false,
      authenticated: true,
      isLogin: true
    }));
  });
});
