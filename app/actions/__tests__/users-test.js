import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { polyfill } from 'es6-promise';
import expect from 'expect';
import * as actions from '../../actions/users';
import * as types from '../../types';
import createAuthServiceStub from '../../tests/helpers/createAuthServiceStub';

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

  const response = {
    data: {
      message: 'Success'
    },
    status: 200
  };

  const data = {
    email: 'hello@world.com',
    password: '2BeOrNot2Be'
  };

  const errMsg = {
    response: {
      data: {
        message: 'Oops! Something went wrong!'
      }
    }
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

      it('should dispatch MANUAL_LOGIN_USER, LOGIN_SUCCESS_USER and route path change actions', done => {
        const expectedActions = [
          {
            type: types.MANUAL_LOGIN_USER
          },
          {
            type: types.LOGIN_SUCCESS_USER,
            message: "You have been successfully logged in"
          },
          {
            payload: {
              args: ['/'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        store.dispatch(actions.manualLogin(data))
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

      it('should dispatch MANUAL_LOGIN_USER and LOGIN_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.MANUAL_LOGIN_USER
          },
          {
            type: types.LOGIN_ERROR_USER,
            message: 'Oops! Invalid username or password'
          }
        ];

        store.dispatch(actions.manualLogin(data))
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

      it('should dispatch SIGNUP_USER, SIGNUP_SUCCESS_USER and route path change actions', done => {
        const expectedActions = [
          {
            type: types.SIGNUP_USER
          },
          {
            type: types.SIGNUP_SUCCESS_USER,
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

        store.dispatch(actions.signUp(data))
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

      it('should dispatch MANUAL_LOGIN_USER and LOGIN_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.SIGNUP_USER
          },
          {
            type: types.SIGNUP_ERROR_USER,
            message: 'Oops! Something went wrong when signing up'
          }
        ];

        store.dispatch(actions.signUp(data))
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

    it('should dispatch LOGOUT_USER, LOGOUT_SUCCESS_USER', done => {
      const expectedActions = [
        {
          type: types.LOGOUT_USER
        },
        {
          type: types.LOGOUT_SUCCESS_USER
        }
      ];

      store.dispatch(actions.logOut(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        })
        .catch(done);
    });

  });

});
