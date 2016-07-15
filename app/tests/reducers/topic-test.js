import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/topic';
import * as types from 'types';

describe('Topics reducer', () => {
  const s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function createTopic() {
    return Array(5).join().split(',')
    .map(() => {
      return s.charAt(Math.floor(Math.random() * s.length));
    })
    .join('');
  }

  const topic = createTopic();

  function createData() {
    return {
      text: createTopic(),
      id: md5.hash(createTopic()),
      count: Math.floor(Math.random() * 100)
    };
  }

  const data = createData();

  function createTopics(x) {
    const arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(createData());
    }
    return arr;
  }

  it('Should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {
        topics: [],
        newTopic: '',
        isFetching: false
      }
    );
  });

  it('Should add a new topic to an empty initial state', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: 1,
        text: topic
      })
    ).toEqual({
        topics: [
          {
            id: data.id,
            count: 1,
            text: topic
          }
        ],
        newTopic: '',
        isFetching: false
    });
  });

  it('Should handle TYPING', () => {
    expect(
      reducer(undefined, {
        type: types.TYPING,
        newTopic: topic
      })
    ).toEqual({
        topics: [],
        newTopic: topic,
        isFetching: false
    });
  });

  it('Should handle GET_TOPICS_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.GET_TOPICS_REQUEST
      })
    ).toEqual({
        isFetching: true,
        topics: [],
        newTopic: ''
    });
  });

  it('Should handle GET_TOPICS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.GET_TOPICS_SUCCESS,
        res: {
          data: topic
        }
      })
    ).toEqual({
        isFetching: false,
        topics: topic,
        newTopic: ''
    });
  });

  it('Should handle CREATE_TOPIC_REQUEST', () => {
    const topics = createTopics(20);
    const newTopics = [...topics, data];
    expect(
      reducer({
        topics
      },
      {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text

      })
    ).toEqual({
        newTopic: '',
        topics: newTopics,
        isFetching: false
    });
  });

  it('should handle CREATE_TOPIC_FAILURE', () => {
    const topics = createTopics(20);
    topics.push(data);
    const newTopics = [...topics];
    expect(
      reducer({
        topics,
        newTopic: topic
      },
      {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id
      })
    ).toEqual({
        topics: newTopics.pop() && newTopics,
        newTopic: topic,
        isFetching: false
    });
  });

  it('should handle DESTROY_TOPIC', () => {
    const topics = createTopics(20);
    topics.push(data);
    const newTopics = [...topics];
    expect(
      reducer({
        topics,
        newTopic: topic
      },
      {
        type: types.DESTROY_TOPIC,
        id: topics[topics.length - 1].id,
      })
    ).toEqual({
        topics: newTopics.pop() && newTopics,
        newTopic: topic,
        isFetching: false
    });
  });

  it('should handle INCREMENT_COUNT', () => {
    const topics = createTopics(20);
    const newTopics = [...topics];
    topics.push(data);
    const newData = Object.assign({}, data);
    newData.count++;
    newTopics.push(newData);

    expect(
      reducer({
        topics,
        newTopic: topic
      },
      {
        type: types.INCREMENT_COUNT,
        id: topics[topics.length - 1].id,
      })
    ).toEqual({
        topics: newTopics,
        newTopic: topic,
        isFetching: false
    });
  });

  it('should handle DECREMENT_COUNT', () => {
    const topics = createTopics(20);
    const newTopics = [...topics];
    topics.push(data);
    const newData = Object.assign({}, data);
    newData.count--;
    newTopics.push(newData);

    expect(
      reducer({
        topics,
        newTopic: topic
      },
      {
        type: types.DECREMENT_COUNT,
        id: topics[topics.length - 1].id,
      })
    ).toEqual({
        topics: newTopics,
        newTopic: topic,
        isFetching: false
    });
  });
});
