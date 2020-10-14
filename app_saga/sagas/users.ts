import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { LOGIN_USER_REQUEST, LOGOUT_USER_REQUEST, SIGNUP_USER_REQUEST } from '../types';
import { authService } from '../services';
import { loginError, loginSuccess, logoutError, logoutSuccess, signUpError, signUpSuccess } from '../actions/users';
import { getTopicsRequest } from '../actions/topics';

function* login(action) {
  try {
    yield call(authService().login, action.data);
    yield put(loginSuccess('You have been successfully logged in'));
    yield put(getTopicsRequest());
    yield put(push('/'));
  } catch (error) {
    yield put(loginError('Oops! Invalid username or password'));
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER_REQUEST, login);
}

function* signUp(action) {
  try {
    yield call(authService().signUp, action.data);
    yield put(signUpSuccess('You have successfully registered an account!'));
    yield put(push('/'));
  } catch (error) {
    yield put(signUpError(error));
  }
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_USER_REQUEST, signUp);
}

function* logOut() {
  try {
    yield call(authService().logOut);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutError(error));
  }
}

function* watchLogOut() {
  yield takeLatest(LOGOUT_USER_REQUEST, logOut);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogOut),
  ]);
}
