import * as types from '../types/user';

export default function user(
  state = {
    authenticated: false
  },
  action = {}
) {
  switch (action.type) {
    case types.SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true
      });
    case types.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true
      });
    case types.SIGNOUT_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false
      });
    default:
      return state;
  }
}
