import md5 from 'spark-md5';

import { voteService } from '../services';
import {
  createTopicDuplicate, createTopicFailure, createTopicRequest, createTopicSuccess,
  getTopicsFailure, getTopicsRequest, getTopicsSuccess,
  destroyTopicSuccess, destroyTopicRequest, destroyTopicFailure,
  decrementCountSuccess, decrementCountFailure,
  incrementCountFailure, incrementCountSuccess,
} from '../actions/topics';

export function getTopics() {
  return (dispatch) => {
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

export function incrementCount(id) {
  return (dispatch) => {
    return voteService().updateTopic({
      id,
      data: {
        isFull: false,
        isIncrement: true,
      },
    })
      .then(() => dispatch(incrementCountSuccess(id)))
      .catch(() => dispatch(incrementCountFailure({
        id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote',
      })));
  };
}

export function decrementCount(id) {
  return (dispatch) => {
    return voteService().updateTopic({
      id,
      data: {
        isFull: false,
        isIncrement: false,
      },
    })
      .then(() => dispatch(decrementCountSuccess(id)))
      .catch(() => dispatch(decrementCountFailure({
        id,
        error: 'Oops! Something went wrong and we couldn\'t increment vote count',
      })));
  };
}

export function destroyTopic(id) {
  return (dispatch) => {
    dispatch(destroyTopicRequest());
    return voteService().deleteTopic({ id })
      .then(() => dispatch(destroyTopicSuccess(id)))
      .catch(() => dispatch(destroyTopicFailure({
        id,
        error: 'Oops! Something went wrong and we couldn\'t decrement vote count',
      })));
  };
}// to have side effects, including executing asynchronous API calls.
export function createTopic(text) {
  return (dispatch, getState) => {
    // If the text box is empty
    if (text.trim().length <= 0) return Promise.reject('text box is empty');

    const id = md5.hash(text);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();
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
          dispatch(createTopicSuccess());
        }
      })
      .catch(() => {
        return dispatch(createTopicFailure({
          id,
          error: 'Oops! Something went wrong and we couldn\'t create your topic',
        }));
      });
  };
}
