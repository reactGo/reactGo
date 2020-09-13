import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
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
    case types.INCREMENT_COUNT:
      if (state.id === action.id) {
        return { ...state, count: state.count + 1 };
      }
      return state;
    case types.DECREMENT_COUNT:
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
    case types.DESTROY_TOPIC:
      return state.filter((t) => t.id !== action.id);
    case types.INCREMENT_COUNT:
    case types.DECREMENT_COUNT:
      return state.map((t) => topic(t, action));
    default:
      return state;
  }
};

const topicSlice = createSlice({
  name: 'topic',
  initialState: [],
  reducers: {
    getTopicSuccess(state, action) {
      if (action.payload) {
        state = action.payload;
      }
    },
    createTopicRequest(state, ) {

    }
  }
})

const newTopicSlice = createSlice({
  name: 'newTopic',
  initialState: '',
  reducers: {
    typing(state, action) {
      state = action.payload;
    },
    createTopicRequest(state) {
      state = '';
    },
  }
});

const topicReducer = combineReducers({
  topics,
  newTopic: newTopicSlice,
});

export default topicReducer;
