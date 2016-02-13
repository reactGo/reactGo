import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/topic';
import * as types from 'constants';

describe('Topics reducer', () => {
  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        topics: [],
        newTopic: ''
      }
    );
  });

  it('Should add a new topic to an empty initial state', () => {
    const topic = 'A time machine';
    const id = md5.hash(topic);
    expect(
      reducer(undefined, {
        type: types.CREATE_TOPIC_REQUEST,
        id: id,
        count: 1,
        text: topic
      })
    ).toEqual({
      topics: [
        {
          id: id,
          count: 1,
          text: topic
        }
      ],
      newTopic: ''
    });
  });
});
