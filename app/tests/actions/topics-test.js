/*eslint no-unused-vars: 0*/ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import * as actions from 'actions/topics';
import * as types from 'constants';

polyfill();

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Topic Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const topic = 'A time machine';
      const id = md5.hash(topic);
      const data = {
        id: id,
        count: 1,
        text: topic
      };

      const initialState = {
        topic: {
          topics: [],
          newtopic: ''
        }
      };

      const expectedActions = [
        {
          type: types.CREATE_TOPIC_REQUEST,
          id: id,
          count: 1,
          text: data.text
        }, {
          type: types.CREATE_TOPIC_SUCCESS
        }
      ];

      sandbox.stub(axios, "post").returns(Promise.resolve({status:200}));
      const store = mockStore(initialState, expectedActions, done);
      store.dispatch(actions.createTopic(topic));
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const topic = 'A time machine';
      const id = md5.hash(topic);
      const data = {
        id: id,
        count: 1,
        text: topic
      };

      const initialState = {
        topic: {
          topics: [],
          newtopic: ''
        }
      };

      const expectedActions = [
        {
          type: types.CREATE_TOPIC_REQUEST,
          id: id,
          count: 1,
          text: data.text
        }, {
          type: types.CREATE_TOPIC_FAILURE,
          id: id,
          error: 'Oops! Something went wrong and we couldn\'t create your topic'
        }
      ];
      sandbox.stub(axios, "post").returns(Promise.reject({status:404, data: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      const store = mockStore(initialState, expectedActions, done);
      store.dispatch(actions.createTopic(topic));
    });

    it('dispatches a duplicate action for a duplicate topic', done => {
      const topic = 'A time machine';
      const id = md5.hash(topic);
      const data = {
        id: id,
        count: 1,
        text: topic
      };

      const initialState = {
        topic: {
          topics: [
            data
          ],
          newtopic: ''
        }
      };

      const expectedActions = [
        {
          type: types.CREATE_TOPIC_DUPLICATE
        }
      ];

      const store = mockStore(initialState, expectedActions, done);
      store.dispatch(actions.createTopic(topic));
    });

  });
 });
