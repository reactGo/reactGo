/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../types/topic';

export function typing(text) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

export function createTopic(text) {
  // If the text box is empty
  if (text.trim().length <= 0) return;

  const request = {
    method: 'post',
    url: '/topic',
    data: {
      count: 1,
      text
    }
  };

  return {
    types: [types.CREATE_TOPIC_REQUEST, types.CREATE_TOPIC_SUCCESS, types.CREATE_TOPIC_FAILURE],
    payload: { request }
  }
}

// Fetch posts logic
export function fetchTopics() {
  const request = {
    method: 'get',
    url: '/topic'
  };

  return {
    types: [types.GET_TOPICS_REQUEST, types.GET_TOPICS_SUCCESS, types.GET_TOPICS_FAILURE],
    payload: { request }
  }
}


export function incrementCount(id) {
  const request = {
    method: 'put',
    url: `/topic/${id}`,
    data: {
      isFull: false,
      isIncrement: true
    }
  };

  return {
    types: [types.INCREMENT_COUNT_REQUEST, types.INCREMENT_COUNT_SUCCESS, types.INCREMENT_COUNT_FAILURE],
    payload: { request }
  };
}

export function decrementCount(id) {
  const request = {
    method: 'put',
    url: `/topic/${id}`,
    data: {
      isFull: false,
      isIncrement: false
    }
  };

  return {
    types: [types.DECREMENT_COUNT_REQUEST, types.DECREMENT_COUNT_SUCCESS, types.DECREMENT_COUNT_FAILURE],
    payload: { request }
  };
}

export function destroyTopic(id) {
  return {
    types: [types.DESTROY_TOPIC_REQUEST, types.DESTROY_TOPIC_SUCCESS, types.DESTROY_TOPIC_FAILURE],
    payload: {
      request: {
        method: 'delete',
        url: `/topic/${id}`
      }
    }
  };
}
