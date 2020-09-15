import { createAsyncThunk } from '@reduxjs/toolkit';
import md5 from 'spark-md5';

import { voteService } from '../services';

interface Topic { id: string, count: number, text: string }

const createTopic = createAsyncThunk<any, string>(
  'topics/createTopic',
  async (text, { rejectWithValue }) => {
    try {
      const id = md5.hash(text);
      // Redux thunk's middleware receives the store methods `dispatch`
      // and `getState` as parameters
      const data = {
        count: 1,
        id,
        text
      };
      const response = await voteService().createTopic({ id, data });
      return response.data;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t create your topic');
    }
  },
  {
    condition: ({ text }, { getState }) => {
      if (text.trim().length <= 0) return false;
      const { topic } = getState();
      const id = md5.hash(text);
      // Conditional dispatch
      // If the topic already exists, make sure we emit a dispatch event
      if (topic.topics.filter((topicItem: Topic) => topicItem.id === id).length > 0) {
        // Currently there is no reducer that changes state for this
        // For production you would ideally have a message reducer that
        // notifies the user of a duplicate topic
        return false;
      }
      return true;
    }
  }
);

const getTopics = createAsyncThunk(
  'topics/getTopics',
  async (data, { rejectWithValue }) => {
    try {
      const response = await voteService().getTopics();
      return response.data;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t fetch your topics');
    }
  }
);

const incrementCount = createAsyncThunk<any, string>(
  'topics/incrementCount',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await voteService().updateTopic({
        id,
        data: {
          isFull: false,
          isIncrement: true
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t increment count of your vote');
    }
  }
);

const decrementCount = createAsyncThunk<any, string>(
  'topics/decrementCount',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await voteService().updateTopic({
        id,
        data: {
          isFull: false,
          isIncrement: false
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t decrement count of your vote');
    }
  }
);

const destroyTopic = createAsyncThunk<any, string>(
  'topics/destroyTopic',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await voteService().deleteTopic({ id });
      return response.data;
    } catch (err) {
      return rejectWithValue('Oops! Something went wrong and we couldn\'t delete your vote');
    }
  }
);

export { createTopic, getTopics, incrementCount, decrementCount, destroyTopic };
export default { createTopic, getTopics, incrementCount, decrementCount, destroyTopic };
