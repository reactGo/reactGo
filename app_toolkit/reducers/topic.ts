import { createSlice } from '@reduxjs/toolkit';
import md5 from 'spark-md5';
import { combineReducers } from 'redux';
import { createTopic, decrementCount, destroyTopic, getTopics, incrementCount } from '../actions/topics';

export interface Topic {
  id: string
  text: string
  count: number
}

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: [] as Topic[],
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(getTopics.fulfilled, (state, action) => {
      if (action.payload) {
        state = action.payload;
      }
    })
    .addCase(createTopic.pending, (state, action) => {
      state.push({ id: md5.hash(action.payload), count: 0, text: action.payload });
    })
    .addCase(createTopic.rejected,
      (state, action) => {
        state = state.filter((t) => t.id !== action.payload);
      })
    .addCase(destroyTopic.fulfilled,
      (state, action) => {
        state = state.filter((t) => t.id !== action.payload);
      })
    .addCase(incrementCount.fulfilled,
      (state, action) => {
        const topic = state.find((t) => t.id === action.payload);
        if (topic) {
          topic.count--;
        }
      })
    .addCase(decrementCount.fulfilled,
      (state, action) => {
        const topic = state.find((t) => t.id === action.payload);
        if (topic) {
          topic.count++;
        }
      }),
});

export const newTopicSlice = createSlice({
  name: 'newTopic',
  initialState: '',
  reducers: {
    typing(state, action) {
      return state = action.payload;
    },
  },
  extraReducers: (builder) => builder.addCase(createTopic.pending, (state) => {
    return state = '';
  }),
});

const topicReducer = combineReducers({
  topics: topicsSlice.reducer,
  newTopic: newTopicSlice.reducer,
});

export default topicReducer;
