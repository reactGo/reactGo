import { createAsyncThunk } from '@reduxjs/toolkit';
import * as md5 from 'spark-md5';
import { voteService } from '../services';

interface Topic {
  id: string,
  count: number,
  text: string
}

const createTopic = createAsyncThunk<string, string, { state: { topic: { topics: Topic[] }, rejectValue: string } }>(
  'topics/createTopic',
  async (text, { rejectWithValue }) => {
    try {
      console.log(text);
      const id = md5.hash(text);
      // Redux thunk's middleware receives the store methods `dispatch`
      // and `getState` as parameters
      const data = {
        count: 1,
        id,
        text,
      };
      const response = await voteService().createTopic({ id, data });
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue('Oops! Something went wrong and we couldn\'t create your topic');
    }
  },
);

const getTopics = createAsyncThunk<Topic[], void, { rejectValue: string }>(
  'topics/getTopics',
  async (data, { rejectWithValue }) => {
    try {
      const response = await voteService().getTopics();
      return response.data;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t fetch your topics');
    }
  },
);

const incrementCount = createAsyncThunk<string, string, { rejectValue: string }>(
  'topics/incrementCount',
  async (id, { rejectWithValue }) => {
    try {
      await voteService().updateTopic({
        id,
        data: {
          isFull: false,
          isIncrement: true,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t increment count of your vote');
    }
  },
);

const decrementCount = createAsyncThunk<string, string, { rejectValue: string }>(
  'topics/decrementCount',
  async (id, { rejectWithValue }) => {
    try {
      await voteService().updateTopic({
        id,
        data: {
          isFull: false,
          isIncrement: false,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t decrement count of your vote');
    }
  },
);

const destroyTopic = createAsyncThunk<string, string, { rejectValue: string }>(
  'topics/destroyTopic',
  async (id, { rejectWithValue }) => {
    try {
      await voteService().deleteTopic({ id });
      return id;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t delete your vote');
    }
  },
);

export { createTopic, getTopics, incrementCount, decrementCount, destroyTopic };
export default { createTopic, getTopics, incrementCount, decrementCount, destroyTopic };
