import * as types from '../constants/actionTypes';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

// Log In Action Creators
function beginLogin() {
	return { 
		type: types.MANUAL_LOGIN_USER };
}

function loginSuccess() {
	return { 
		type: types.LOGIN_SUCCESS_USER };
}

function loginError() {
	return { 
		type: types.LOGIN_ERROR_USER };
}

// Sign Uo Action Creators
function signUpError() {
	return { 
		type: types.SIGNUP_ERROR_USER };
}

function beginSignUp() {
	return { 
		type: types.SIGNUP_USER };
}

function signUpSuccess() {
	return { 
		type: types.SIGNUP_SUCCESS_USER };
}

// Log Out Action Creators
function beginLogout() {
	return { 
		type: types.LOGOUT_USER};
}

function logoutSuccess() {
	return { 
		type: types.LOGOUT_SUCCESS_USER};
}

function logoutError() {
	return { 
		type: types.LOGOUT_ERROR_USER};
}

export function manualLogin(data) {
	return dispatch => {
		dispatch(beginLogin());
		return UserWebAPIUtils.manuallogin(data)
		.then((response, textStatus) => {
			if (textStatus === 'success') {
				// Dispatch another event for successful login
				dispatch(loginSuccess());
			}
		}, () => {
			// Dispatch another event for a bad login
			dispatch(loginError());
		});
	};
}

export function signUp() {
	return dispatch => {
		dispatch(beginSignUp());
		return UserWebAPIUtils.signUp()
			.then((response, textStatus) => {
				if (textStatus === 'success') {
					// Dispatch another event for successful login
					dispatch(signUpSuccess());
				}
			}, () => {
				// Dispatch another event for a bad login
					dispatch(signUpError());
			});
	};
}

export function logOut() {
	console.log('logging out inside Actions');
	return dispatch => {
		dispatch(beginLogout());
		return UserWebAPIUtils.logout()
			.then((response, textStatus) => {
				if (textStatus === 'success') {
					// Dispatch another event for successful login
					dispatch(logoutSuccess());
				}
			}, () => {
				// Dispatch another event for a bad login
					dispatch(logoutError());
			});
	};
}

