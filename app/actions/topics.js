/* eslint consistent-return: 0, no-else-return: 0*/
import { request } from './network';
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

  return request(types.CREATE_TOPIC, {
    method: 'post',
    url: '/topic',
    data: {
      count: 1,
      text
    }
  });
}

export function fetchTopics() {
  return request(types.GET_TOPICS, {
    method: 'get',
    url: '/topic'
  });
}

export function destroyTopic(id) {
  return request(types.DESTROY_TOPIC, {
    method: 'delete',
    url: `/topic/${id}`
  });
}

export function incrementCount(id) {
  return request(types.INCREMENT_COUNT, {
    method: 'put',
    url: `/topic/${id}`,
    data: {
      isFull: false,
      isIncrement: true
    }
  });
}

export function decrementCount(id) {
  return request(types.DECREMENT_COUNT, {
    method: 'put',
    url: `/topic/${id}`,
    data: {
      isFull: false,
      isIncrement: false
    }
  });
}
