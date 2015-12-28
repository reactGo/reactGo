import expect from 'expect';
import { applyMiddleware } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
// This bit is important. Isomorphic-fetch node will use 
// fetch-npm-browserify if we do not use the node-fetch implementation
// This is the only solution I could come up so that nock could function correctly.
// If you do have a better implementation, please let me know.
import fetch from 'isomorphic-fetch/fetch-npm-node';
import nock from 'nock';
import * as actions from 'actions/topics';
import * as types from 'constants';  

polyfill();

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Ansynchronous Topic Actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('create request and success actions when a topic is entered successfully', done => {
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

    // This mocks the server response
    // 200 means it was successful
    // port:9876 is karma server's default port
    nock('http://localhost:9876')
      .post('/topic', data)
      .reply(200, 'OK');

    const store = mockStore(initialState, expectedActions, done);
    store.dispatch(actions.createTopic(topic));
  });

  it('create request and failed actions when server is not working', done => {
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
        ex: 'Oops! Something went wrong and we couldn\'t create your topic'
      }
    ];

    // This mocks the server response
    // 200 means it was successful
    // port:9876 is karma server's default port
    nock('http://localhost:9876')
      .post('/topic', data)
      .reply(400);

    const store = mockStore(initialState, expectedActions, done);
    store.dispatch(actions.createTopic(topic));

  });

  it('Should dispatch a CREATE_TOPIC_DUPLICATE action for a duplicate topic', done => {
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
