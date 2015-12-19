import expect from 'expect';
import * as actions from '../../app/actions/topics';
import * as types from '../../app/constants';  

describe('Synchronous Topic Actions', () => {
  it('create CREATE_TOPIC action when a topic is entered', () => {
    const data = {
      id: Date.now().toString(),
      count: 1,
      text: 'A time machine'
    };
    const expectedAction = {
      type: types.CREATE_TOPIC,
      data: data
    };
    expect(actions.createTopic(data)).toEqual(expectedAction);
  });
});
