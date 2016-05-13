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
    case types.GET_TOPICS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.GET_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        topics: action.payload.data
      });
    case types.GET_TOPICS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case types.CREATE_TOPIC_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.CREATE_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        topics: [...state.topics, action.payload.data],
        newTopic: ''
      });
    case types.CREATE_TOPIC_FAILURE:
      return {
        isFetching: false,
        topics: state.topics,
        newTopic: state.newTopic
      };
    case types.DESTROY_TOPIC_REQUEST:
      return {
        isFetching: true,
        topics: state.topics,
        newTopic: state.newTopic
      };
    case types.DESTROY_TOPIC_SUCCESS:
      return {
        isFetching: false,
        topics: state.topics.filter((obj) => obj._id !== action.payload.data._id),
        newTopic: state.newTopic
      };
    case types.DESTROY_TOPIC_FAILURE:
      return {
        isFetching: false,
        topics: state.topics,
        newTopic: state.newTopic
      };
    case types.INCREMENT_COUNT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.INCREMENT_COUNT_SUCCESS:
      return {
        isFetching: false,
        topics: state.topics.reduce((topics, topic) => {
          if (topic._id === action.payload.data._id) {
            topic = action.payload.data;
          }

          topics.push(topic);

          return topics;
        }, []),
        newTopic: state.newTopic
      };
    case types.INCREMENT_COUNT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case types.DECREMENT_COUNT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.DECREMENT_COUNT_SUCCESS:
      return {
        isFetching: false,
        topics: state.topics.reduce((topics, topic) => {
          if (topic._id === action.payload.data._id) {
            topic = action.payload.data;
          }

          topics.push(topic);

          return topics;
        }, []),
        newTopic: state.newTopic
      };
    case types.DECREMENT_COUNT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
