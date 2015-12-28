// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
import fetch from 'isomorphic-fetch';

import * as types from 'constants';

// Note this can be extracted out later
/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api='/login') {
  return fetch(api, {
    method: method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess() {
  return { type: types.LOGIN_SUCCESS_USER };
}

function loginError() {
  return { type: types.LOGIN_ERROR_USER };
}

// Sign Up Action Creators
function signUpError() {
  return { type: types.SIGNUP_ERROR_USER };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess() {
  return { type: types.SIGNUP_SUCCESS_USER };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER};
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER};
}

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then( response => {
        if (response.status === 200) {
          dispatch(loginSuccess());
        } else {
          dispatch(loginError());
        }
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    return makeUserRequest('post', data, '/signup')
      .then( response => {
        if (response.status === 200) {
          dispatch(signUpSuccess());
        } else {
          dispatch(signUpError());
        }
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return fetch('/logout', {
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then( response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

