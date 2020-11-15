/* eslint consistent-return: 0, no-else-return: 0 */
import md5 from 'spark-md5';
import { ThunkDispatch } from 'redux-thunk';

import * as types from '../types';
import { voteService } from '../services';

function increment(id: string) {
  return { type: types.INCREMENT_COUNT_REQUEST, id };
}

function decrement(id: string) {
  return { type: types.DECREMENT_COUNT_REQUEST, id };
}

function destroy(id: string) {
  return { type: types.DESTROY_TOPIC_REQUEST, id };
}

interface Topic { id: string, count: number, text: string }

function createTopicRequest(data: Topic) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

function createTopicSuccess() {
  return {
    type: types.CREATE_TOPIC_SUCCESS
  };
}

function createTopicFailure(data: { id: string, error: string }) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createTopicDuplicate() {
  return {
    type: types.CREATE_TOPIC_DUPLICATE
  };
}

export function typing(text: string) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createTopic(text: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: () => { topic: { topics: Topic[] }}) => {
    // If the text box is empty
    if (text.trim().length <= 0) return;

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();
    const data = {
      count: 1,
      id,
      text
    };

    // Conditional dispatch
    // If the topic already exists, make sure we emit a dispatch event
    if (topic.topics.filter((topicItem: Topic) => topicItem.id === id).length > 0) {
      // Currently there is no reducer that changes state for this
      // For production you would ideally have a message reducer that
      // notifies the user of a duplicate topic
      return dispatch(createTopicDuplicate());
    }

    // First dispatch an optimistic update
    dispatch(createTopicRequest(data));

    return voteService().createTopic({ id, data })
      .then((res) => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return dispatch(createTopicSuccess());
        }
      })
      .catch(() => {
        return dispatch(createTopicFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}


function getTopicsRequest() {
  return {
    type: types.GET_TOPICS_REQUEST,
  };
}

function getTopicsSuccess(data: Topic) {
  return {
    type: types.GET_TOPICS_SUCCESS,
    data,
  };
}

function getTopicsFailure(error: string) {
  return {
    type: types.GET_TOPICS_FAILURE,
    error,
  };
}

export function getTopics() {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch(getTopicsRequest());
    return voteService().getTopics()
      .then((res) => {
        dispatch(getTopicsSuccess(res.data));
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch(getTopicsFailure(error));
        return Promise.reject(error);
      });
  };
}

export function incrementCount(id: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    return voteService().updateTopic({
      id,
      data: {
        isFull: false,
        isIncrement: true
      }
    })
      .then(() => dispatch(increment(id)))
      .catch(() => dispatch(createTopicFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function decrementCount(id: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    return voteService().updateTopic({
      id,
      data: {
        isFull: false,
        isIncrement: false
      }
    })
      .then(() => dispatch(decrement(id)))
      .catch(() => dispatch(createTopicFailure({id, error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function destroyTopic(id: string) {
  return (dispatch: ThunkDispatch<{}, {}, any>) => {
    return voteService().deleteTopic({ id })
      .then(() => dispatch(destroy(id)))
      .catch(() => dispatch(createTopicFailure({
id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'
})));
  };
}
