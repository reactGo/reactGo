import {
  TYPING,
  CREATE_TOPIC_REQUEST,
  CREATE_TOPIC_FAILURE,
  DESTROY_TOPIC,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE } from './actions';
import { combineReducers } from 'redux';

const isFetching = (
  state = false,
  action
) => {
  switch (action.type) {
    case GET_TOPICS_REQUEST:
      return true;
    case GET_TOPICS_SUCCESS:
    case GET_TOPICS_FAILURE:
      return false;
    default:
      return state;
  }
};

const topic = (
  state = {},
  action
) => {
  switch (action.type) {
    case CREATE_TOPIC_REQUEST:
      return {
        id: action.id,
        count: action.count,
        text: action.text
      };
    case INCREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case DECREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count - 1 };
      }
      return state;
    default:
      return state;
  }
};

const topics = (
  state = [],
  action
) => {
  switch (action.type) {
    case GET_TOPICS_SUCCESS:
      return action.res.data;
    case CREATE_TOPIC_REQUEST:
      return [...state, topic(undefined, action)];
    case CREATE_TOPIC_FAILURE:
      return state.filter(t => t.id !== action.id);
    case DESTROY_TOPIC:
      return state.filter(t => t.id !== action.id);
    case INCREMENT_COUNT:
    case DECREMENT_COUNT:
      return state.map(t => topic(t, action));
    default:
      return state;
  }
};

const newTopic = (
  state = '',
  action
) => {
  switch (action.type) {
    case TYPING:
      return action.newTopic;
    case CREATE_TOPIC_REQUEST:
      return '';
    default:
      return state;
  }
};

const topicReducer = combineReducers({
  topics,
  isFetching,
  newTopic
});

export default topicReducer;
