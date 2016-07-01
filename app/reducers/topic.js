import * as types from 'types';

export default function topic(state = {
  topics: [],
  newTopic: ''
}, action) {
  switch (action.type) {
    case types.TYPING:
      return {...state, newTopic: action.newTopic};
    case types.GET_TOPICS_REQUEST:
      return {...state, isFetching: true};
    case types.GET_TOPICS_SUCCESS:
      return {...state, isFetching: false, topics: action.res.data};
    case types.GET_TOPICS_FAILURE:
      return {...state, isFetching: false, error: action.error};
    case types.CREATE_TOPIC_REQUEST:
      return {
        topics: [...state.topics, { id: action.id, count: action.count, text: action.text }],
        newTopic: ''
      };
    case types.CREATE_TOPIC_FAILURE:
      return {
        topics: [...state.topics.filter((tp) => tp.id !== action.id)],
        newTopic: state.newTopic
      };
    case types.DESTROY_TOPIC:
      return {
        topics: [...state.topics.filter((tp, i) => i !== action.index)],
        newTopic: state.newTopic
      };
    case types.INCREMENT_COUNT:
      return {
        topics: [
          ...state.topics.slice(0, action.index),
          {...state.topics[action.index], count: state.topics[action.index].count + 1},
          ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };
    case types.DECREMENT_COUNT:
      return {
        topics: [
          ...state.topics.slice(0, action.index),
          {...state.topics[action.index], count: state.topics[action.index].count - 1},
          ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };
    default:
      return state;
  }
}
