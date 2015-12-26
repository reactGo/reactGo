import expect from 'expect';
import { applyMiddleware } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import fetchMock from 'fetch-mock';
import * as actions from 'actions/topics';
import * as types from 'constants';  

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Ansynchronous Topic Actions', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('create CREATE_TOPIC_REQUEST action when a topic is entered successfully', done => {
    const topic = 'A time machine';
    const id = md5.hash(topic);
    const data = {
      id: id,
      count: 1,
      text: topic
    };

    const expectedActions = [
      {
        type: types.CREATE_TOPIC_REQUEST,
        id: id,
        count: 1,
        text: data.text
      }, {
        type: 'CREATE_TOPIC_SUCCESS'
      }
    ];

    fetchMock.mock('/post', 200);

    const store = mockStore({ topics: [], newTopic: ''}, expectedActions, done);
    store.dispatch(actions.createTopic(topic));
  });
});
