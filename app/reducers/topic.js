import {
  TYPING,
  CREATE_TOPIC_REQUEST,
  CREATE_TOPIC_FAILURE,
  DESTROY_TOPIC,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE } from 'constants/index';


export default function topic(state = {
  topics: [],
  newTopic: ''
}, action) {
  switch (action.type) {
    case TYPING:
      return Object.assign({}, state,
        { newTopic: action.newTopic }
      );
    case GET_TOPICS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        topics: action.req.data
      });
    case GET_TOPICS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case CREATE_TOPIC_REQUEST:
      return {
        topics: [...state.topics, { id: action.id, count: action.count, text: action.text }],
        newTopic: ''
      };
    case CREATE_TOPIC_FAILURE:
      return {
        topics: [...state.topics.filter((tp) => tp.id !== action.id)],
        newTopic: state.newTopic
      };
    case DESTROY_TOPIC:
      return {
        topics: [...state.topics.filter((tp, i) => i !== action.index)],
        newTopic: state.newTopic
      };
    case INCREMENT_COUNT:
      return {
        topics: [
        ...state.topics.slice(0, action.index),
        Object.assign({}, state.topics[action.index], {
          count: state.topics[action.index].count + 1
        }),
        ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };
    case DECREMENT_COUNT:
      return {
        topics: [
        ...state.topics.slice(0, action.index),
        Object.assign({}, state.topics[action.index], {
          count: state.topics[action.index].count - 1
        }),
        ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };

    default:
      return state;
  }
}
