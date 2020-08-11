import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as types from '../../types';
import createAuthServiceStub from '../../tests/helpers/createAuthServiceStub';
import { logOut, manualLogin, signUp } from '../../thunks/users';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Users Async Actions', () => {
  let store;
  let stub;

  const initialState = {
    isLogin: true,
    message: '',
    isWaiting: false,
    authenticated: false
  };

  const data = {
    email: 'hello@world.com',
    password: '2BeOrNot2Be'
  };

  describe('manualLogin', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('login').with(() => Promise.resolve({ status: 200 }));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch MANUAL_LOGIN_USER, LOGIN_USER_REQUEST and route path change actions', (done) => {
        const expectedActions = [
          {
            type: types.MANUAL_LOGIN_USER
          },
          {
            type: types.LOGIN_USER_REQUEST,
            message: 'You have been successfully logged in'
          },
          {
            payload: {
              args: ['/'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        store.dispatch(manualLogin(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
    describe('on failure', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('login').with(() => Promise.reject({ status: 401 }));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch MANUAL_LOGIN_USER and LOGIN_USER_FAILURE', (done) => {
        const expectedActions = [
          {
            type: types.MANUAL_LOGIN_USER
          },
          {
            type: types.LOGIN_USER_FAILURE,
            message: 'Oops! Invalid username or password'
          }
        ];

        store.dispatch(manualLogin(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('signUp', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('signUp').with(() => Promise.resolve({ status: 200 }));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS and route path change actions', (done) => {
        const expectedActions = [
          {
            type: types.SIGNUP_USER_REQUEST
          },
          {
            type: types.SIGNUP_USER_SUCCESS,
            message: 'You have successfully registered an account!'
          },
          {
            payload: {
              args: ['/'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        store.dispatch(signUp(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
    describe('on failure', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('signUp').with(() => Promise.reject({ status: 401 }));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch MANUAL_LOGIN_USER and LOGIN_USER_FAILURE', (done) => {
        const expectedActions = [
          {
            type: types.SIGNUP_USER_REQUEST
          },
          {
            type: types.SIGNUP_USER_FAILURE,
            message: 'Oops! Something went wrong when signing up'
          }
        ];

        store.dispatch(signUp(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('logOut', () => {
    beforeEach(() => {
      stub = createAuthServiceStub().replace('logOut').with(() => Promise.resolve({ status: 200 }));
      store = mockStore(initialState);
    });

    afterEach(() => {
      stub.restore();
    });

    it('should dispatch LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS', (done) => {
      const expectedActions = [
        {
          type: types.LOGOUT_USER_REQUEST
        },
        {
          type: types.LOGOUT_USER_SUCCESS
        }
      ];

      store.dispatch(logOut(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        })
        .catch(done);
    });
  });
});
