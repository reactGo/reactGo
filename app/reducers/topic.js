import * as types from '../types/topic';

export default function topic(state = {
  topics: [],
  newTopic: ''
}, action) {
  switch (action.type) {
    case types.TYPING:
      return Object.assign({}, state,
        { newTopic: action.newTopic }
      );
    case types.GET_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        topics: action.payload.data
      });
    case types.CREATE_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        topics: [...state.topics, action.payload.data],
        newTopic: ''
      });
    case types.DESTROY_TOPIC_SUCCESS:
      return {
        topics: state.topics.filter((obj) => obj._id !== action.payload.data._id),
        newTopic: state.newTopic
      };
    case types.INCREMENT_COUNT_SUCCESS:
      return {
        topics: state.topics.reduce((topics, topic) => {
          if (topic._id === action.payload.data._id) {
            topic = action.payload.data;
          }

          topics.push(topic);

          return topics;
        }, []),
        newTopic: state.newTopic
      };
    case types.DECREMENT_COUNT_SUCCESS:
      return {
        topics: state.topics.reduce((topics, topic) => {
          if (topic._id === action.payload.data._id) {
            topic = action.payload.data;
          }

          topics.push(topic);

          return topics;
        }, []),
        newTopic: state.newTopic
      };

    default:
      return state;
  }
}
