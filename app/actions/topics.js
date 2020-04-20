/* eslint consistent-return: 0, no-else-return: 0 */
import * as types from '../types';

export function incrementCountSuccess(id) {
  return { type: types.INCREMENT_COUNT_SUCCESS, id };
}

export function incrementCountFailure(id) {
  return { type: types.INCREMENT_COUNT_FAILURE, id };
}

export function decrementCountSuccess(id) {
  return { type: types.DECREMENT_COUNT_SUCCESS, id };
}

export function decrementCountFailure(id) {
  return { type: types.DECREMENT_COUNT_FAILURE, id };
}

export function destroyTopicRequest() {
  return { type: types.DESTROY_TOPIC_REQUEST };
}

export function destroyTopicSuccess(id) {
  return { type: types.DESTROY_TOPIC_SUCCESS, id };
}

export function destroyTopicFailure(data) {
  return { type: types.DESTROY_TOPIC_FAILURE, id: data.id, error: data.error };
}

export function createTopicRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

export function createTopicSuccess() {
  return {
    type: types.CREATE_TOPIC_SUCCESS
  };
}

export function createTopicFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createTopicDuplicate() {
  return {
    type: types.CREATE_TOPIC_DUPLICATE
  };
}

export function typing(text) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed

export function getTopicsRequest() {
  return {
    type: types.GET_TOPICS_REQUEST,
  };
}

export function getTopicsSuccess(data) {
  return {
    type: types.GET_TOPICS_SUCCESS,
    data,
  };
}

export function getTopicsFailure(error) {
  return {
    type: types.GET_TOPICS_FAILURE,
    error,
  };
}
