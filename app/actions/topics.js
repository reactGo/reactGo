import { create, destroy, update, fetch } from './network';
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

  return create(types.CREATE_TOPIC_REQUEST, {
    url: '/topic',
    data: {
      count: 1,
      text
    }
  });
}

export function fetchTopics() {
  return fetch(types.GET_TOPICS_REQUEST, {
    url: '/topic'
  });
}

export function destroyTopic(id) {
  return destroy(types.DESTROY_TOPIC_REQUEST, {
    url: `/topic/${id}`
  });
}

export function incrementCount(id) {
  return update(types.INCREMENT_COUNT_REQUEST, {
    url: `/topic/${id}`,
    data: {
      isFull: false,
      isIncrement: true
    }
  });
}

export function decrementCount(id) {
  return update(types.DECREMENT_COUNT_REQUEST, {
    url: `/topic/${id}`,
    data: {
      isFull: false,
      isIncrement: false
    }
  });
}
