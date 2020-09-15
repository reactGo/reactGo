import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import md5 from 'spark-md5';
import { createTopic, getTopics, destroyTopic, incrementCount, decrementCount } from '../actions/topics';

export interface Topic {
  id: string
  text: string
  count: number
}

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: [] as Topic[],
  reducers: {},
  extraReducers: {
    [getTopics.fulfilled]: (state, action) => {
      if (action.payload) {
        state = action.payload;
      }
    },
    [createTopic.pending]: (state, action) => {
      state.push({ id: md5.hash(action.payload), count: 0, text: action.payload });
    },
    [createTopic.rejected]: (state, action) => {
      state = state.filter((t) => t.id !== action.payload);
    },
    [destroyTopic.fulfilled]: (state, action) => {
      state = state.filter((t) => t.id !== action.payload);
    },
    [incrementCount.fulfilled]: (state, action) => {
      const topic = state.find((t) => t.id === action.payload);
      if (topic) {
        topic.count--;
      }
    },
    [decrementCount.fulfilled]: (state, action) => {
      const topic = state.find((t) => t.id === action.payload);
      if (topic) {
        topic.count++;
      }
    }
  }
});

export const newTopicSlice = createSlice({
  name: 'newTopic',
  initialState: '',
  reducers: {
    typing(state, action) {
      state = action.payload;
    },
  },
  extraReducers: {
    [createTopic.pending]: (state) => {
      state = '';
    }
  }
});

const topicReducer = combineReducers({
  topics: topicsSlice.reducer,
  newTopic: newTopicSlice.reducer,
});

export default topicReducer;
