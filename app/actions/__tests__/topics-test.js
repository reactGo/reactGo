/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import expect from 'expect';
import * as actions from '../../actions/topics';
import * as types from '../../types';
import createVoteServiceStub from '../../tests/helpers/createVoteServiceStub';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Topic Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const index = 0;
    const topic = 'A time machine';
    const id = md5.hash(topic);
    const data = {
      id,
      count: 1,
      text: topic
    };

    const initialState = {
      topic: {
        topics: [],
        newtopic: ''
      }
    };

    it('dispatches a duplicate action for a duplicate topic', () => {
      initialState.topic.topics.push(data);

      const expectedActions = [
        {
          type: types.CREATE_TOPIC_DUPLICATE
        }
      ];

      const store = mockStore(initialState);
      store.dispatch(actions.createTopic(topic));
      expect(store.getActions()).toEqual(expectedActions);
      initialState.topic.topics.pop();
    });

    describe('createTopic', () => {
      let store;
      let stub;

      describe('on success', () => {

        beforeEach(() => {
          stub = createVoteServiceStub().replace('createTopic').with(() => Promise.resolve({ status: 200 }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_TOPIC request and success actions', done => {
          const expectedActions = [
            {
              type: types.CREATE_TOPIC_REQUEST,
              id,
              count: 1,
              text: data.text
            }, {
              type: types.CREATE_TOPIC_SUCCESS
            }
          ];

          store.dispatch(actions.createTopic(topic))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });

      });

      describe('with an existing topic', () => {
        const topicsWithData = initialState.topic.topics.concat(data);
        const initialStateWithTopic = { ...initialState, topic: { topics: topicsWithData }};

        beforeEach(() => {
          stub = createVoteServiceStub().replace('createTopic').with(() => Promise.resolve({ status: 200 }));
          store = mockStore(initialStateWithTopic);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_TOPIC_DUPLICATE action', () => {
          const expectedActions = [
            {
              type: types.CREATE_TOPIC_DUPLICATE
            }
          ];
          store.dispatch(actions.createTopic(topic));
          expect(store.getActions()).toEqual(expectedActions);
        });

      });

      describe('on failure', () => {
        beforeEach(() => {
          stub = createVoteServiceStub().replace('createTopic').with(() => Promise.reject({ status: 400 }));
          store = mockStore(initialState);
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_TOPIC_FAILURE action', done => {
          const expectedActions = [
            {
              type: types.CREATE_TOPIC_REQUEST,
              id,
              count: 1,
              text: data.text
            }, {
              type: types.CREATE_TOPIC_FAILURE,
              id,
              error: 'Oops! Something went wrong and we couldn\'t create your topic'
            }
          ];

          store.dispatch(actions.createTopic(topic))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });
    });


    describe('incrementCount', () => {
      let store;
      let stub;

      describe('on success', () => {

        beforeEach(() => {
          stub = createVoteServiceStub().replace('updateTopic').with(() => Promise.resolve({ status: 200 }));
          store = mockStore();
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a INCREMENT_COUNT action', done => {
          const expectedActions = [
            {
              type: types.INCREMENT_COUNT,
              id
            }
          ];

          store.dispatch(actions.incrementCount(id))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });

      describe('on failure', () => {
        beforeEach(() => {
          stub = createVoteServiceStub().replace('updateTopic').with(() => Promise.reject({ status: 400 }));
          store = mockStore();
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_TOPIC_FAILURE action', done => {
          const expectedActions = [
            {
              type: types.CREATE_TOPIC_FAILURE,
              id: id,
              error: 'Oops! Something went wrong and we couldn\'t add your vote'
            }
          ];

          store.dispatch(actions.incrementCount(id))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });
    });

    describe('decrementCount', () => {
      let store;
      let stub;

      describe('on success', () => {

        beforeEach(() => {
          stub = createVoteServiceStub().replace('updateTopic').with(() => Promise.resolve({ status: 200 }));
          store = mockStore();
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a DECREMENT_COUNT action', done => {
          const expectedActions = [
            {
              type: types.DECREMENT_COUNT,
              id
            }
          ];

          store.dispatch(actions.decrementCount(id))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });

      describe('on failure', () => {
        beforeEach(() => {
          stub = createVoteServiceStub().replace('updateTopic').with(() => Promise.reject({ status: 400 }));
          store = mockStore();
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_TOPIC_FAILURE action', done => {
          const expectedActions = [
            {
              type: types.CREATE_TOPIC_FAILURE,
              id: id,
              error: 'Oops! Something went wrong and we couldn\'t add your vote'
            }
          ];

          store.dispatch(actions.decrementCount(id))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });
    });

    describe('destroyTopic', () => {
      let store;
      let stub;

      describe('on success', () => {

        beforeEach(() => {
          stub = createVoteServiceStub().replace('deleteTopic').with(() => Promise.resolve({ status: 200 }));
          store = mockStore();
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a DESTROY_TOPIC action', done => {
          const expectedActions = [
            {
              type: types.DESTROY_TOPIC,
              id
            }
          ];

          store.dispatch(actions.destroyTopic(id))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });

      describe('on failure', () => {
        beforeEach(() => {
          stub = createVoteServiceStub().replace('deleteTopic').with(() => Promise.reject({ status: 400 }));
          store = mockStore();
        });

        afterEach(() => {
          stub.restore();
        });

        it('should dispatch a CREATE_TOPIC_FAILURE action', done => {
          const expectedActions = [
            {
              type: types.CREATE_TOPIC_FAILURE,
              id: id,
              error: 'Oops! Something went wrong and we couldn\'t add your vote'
            }
          ];

          store.dispatch(actions.destroyTopic(id))
            .then(() => {
              expect(store.getActions()).toEqual(expectedActions);
              done();
            })
            .catch(done);
        });
      });
    });

  });
});

