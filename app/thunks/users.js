import { push } from 'connected-react-router';

import { authService } from '../services';
import { getTopics } from './topics';
import {
  beginLogin,
  beginLogout,
  beginSignUp,
  loginError,
  loginSuccess,
  logoutError,
  logoutSuccess,
  signUpError,
  signUpSuccess,
} from '../actions/users';

export function manualLogin(data) {
  return (dispatch) => {
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

export function signUp(data) {
  return (dispatch) => {
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
  return (dispatch) => {
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
