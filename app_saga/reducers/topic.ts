import { AnyAction, combineReducers } from 'redux';
import md5 from 'spark-md5';
import * as types from '../types';

export interface Topic {
  id: string
  text: string
  count: number
}

const topic = (
  state: Topic,
  action: AnyAction
) => {
  switch (action.type) {
    case types.CREATE_TOPIC_REQUEST:
      return {
        id: action.id,
        count: action.count,
        text: action.text
      };
    case types.INCREMENT_COUNT_SUCCESS:
      if (state.id === action.id) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case types.DECREMENT_COUNT_SUCCESS:
      if (state.id === action.id) {
        return { ...state, count: state.count - 1 };
      }
      return state;
    default:
      return state;
  }
};

const topics = (
  state: Topic[] = [],
  action: AnyAction
) => {
  switch (action.type) {
    case types.GET_TOPICS_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_TOPIC_REQUEST:
      return [...state, topic({ id: md5.hash(action.text), count: 0, text: action.text }, action)];
    case types.CREATE_TOPIC_FAILURE:
      return state.filter((t) => t.id !== action.id);
    case types.DESTROY_TOPIC_SUCCESS:
      return state.filter((t) => t.id !== action.id);
    case types.INCREMENT_COUNT_SUCCESS:
    case types.DECREMENT_COUNT_SUCCESS:
      return state.map((t) => topic(t, action));
    default:
      return state;
  }
};

const newTopic = (
  state = '',
  action: AnyAction
) => {
  switch (action.type) {
    case types.TYPING:
      return action.newTopic;
    case types.CREATE_TOPIC_REQUEST:
      return '';
    default:
      return state;
  }
};

const topicReducer = combineReducers({
  topics,
  newTopic
});

export default topicReducer;
