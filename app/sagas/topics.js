import { all, call, fork, put, takeLatest, select } from 'redux-saga/effects';
import md5 from 'spark-md5';

import { voteService } from '../services';
import {
  CREATE_TOPIC_REQUEST,
  DECREMENT_COUNT_REQUEST,
  DESTROY_TOPIC_REQUEST,
  GET_TOPICS_REQUEST,
  INCREMENT_COUNT_REQUEST,
} from '../types';
import {
  createTopicDuplicate, createTopicFailure, createTopicRequest, decrementCountFailure, decrementCountSuccess,
  destroyTopicFailure,
  destroyTopicSuccess,
  getTopicsFailure,
  getTopicsSuccess, incrementCountFailure, incrementCountSuccess,
} from '../actions/topics';

function* getTopics() {
  try {
    const res = yield call(voteService().getTopics);
    yield put(getTopicsSuccess(res.data));
  } catch (error) {
    yield put(getTopicsFailure(error));
  }
}

function* watchGetTopics() {
  yield takeLatest(GET_TOPICS_REQUEST, getTopics);
}

function* destroyTopic(action) {
  try {
    yield call(voteService().deleteTopic, { id: action.id });
    yield put(destroyTopicSuccess(action.id));
  } catch (error) {
    yield put(destroyTopicFailure({
      id: action.id,
      error: 'Oops! Something went wrong and we couldn\'t add your vote',
    }));
  }
}

function* watchDestroyTopic() {
  yield takeLatest(DESTROY_TOPIC_REQUEST, destroyTopic);
}

function* createTopic({ text }) {
  const id = md5.hash(text);
  try {
    if (text.trim().length <= 0) return Promise.reject('text box is empty');
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = select();
    const data = {
      count: 1,
      id,
      text,
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (topic.topics.filter((topicItem) => topicItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return yield put(createTopicDuplicate());
    }

    // First dispatch an optimistic update
    yield put(createTopicRequest(data));

    return yield call(voteService().createTopic, { id, data });
  } catch (error) {
    return yield put(createTopicFailure({
      id,
      error: 'Oops! Something went wrong and we couldn\'t add your vote',
    }));
  }
}

function* watchCreateTopic() {
  yield takeLatest(CREATE_TOPIC_REQUEST, createTopic);
}

function* incrementCount(action) {
  try {
    yield call(voteService().updateTopic, {
      id: action.id,
      data: {
        isFull: false,
        isIncrement: true,
      },
    });
    yield put(incrementCountSuccess(action.id));
  } catch (error) {
    yield put(incrementCountFailure({
      id: action.id,
      error: 'Oops! Something went wrong and we couldn\'t increment vote count',
    }));
  }
}

function* watchIncrementCount() {
  yield takeLatest(INCREMENT_COUNT_REQUEST, incrementCount);
}

function* decrementCount(action) {
  try {
    yield call(voteService().updateTopic, {
      id: action.id,
      data: {
        isFull: false,
        isIncrement: true,
      },
    });
    yield put(decrementCountSuccess(action.id));
  } catch (error) {
    yield put(decrementCountFailure({
      id: action.id,
      error: 'Oops! Something went wrong and we couldn\'t decrement vote count',
    }));
  }
}

function* watchDecrementCount() {
  yield takeLatest(DECREMENT_COUNT_REQUEST, decrementCount);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetTopics),
    fork(watchDestroyTopic),
    fork(watchCreateTopic),
    fork(watchIncrementCount),
    fork(watchDecrementCount),
  ]);
}
