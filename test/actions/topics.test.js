import expect from 'expect';
import { applyMiddleware } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { md5 } from 'blueimp-md5';
import nock from 'nock';
import * as actions from '../../app/actions/topics';
import * as types from '../../app/constants';  

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('Ansynchronous Topic Actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('create CREATE_TOPIC_REQUEST action when a topic is entered successfully', done => {
    const topic = 'A time machine';
    console.log(md5);
    const id = md5(topic);
    const data = {
      id: id,
      count: 1,
      text: topic
    };

    const expectedAction ={
      type: types.CREATE_TOPIC_REQUEST,
      id: id,
      count: 1,
      text: data.text
    };

    nock('http://localhost:3000')
      .post('/topic', data)
      .reply(200, 'OK');

    const store = mockStore({ topics: [], newTopic: ''}, expectedAction, done);
    store.dispatch(actions.createTopic(topic));
  });
});
