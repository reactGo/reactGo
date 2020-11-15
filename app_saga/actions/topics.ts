/* eslint consistent-return: 0, no-else-return: 0 */
import { Topic } from '../reducers/topic';
import * as types from '../types';

export function incrementCountRequest(id: string) {
  return { type: types.INCREMENT_COUNT_REQUEST, id };
}

export function incrementCountSuccess(id: string) {
  return { type: types.INCREMENT_COUNT_SUCCESS, id };
}

export function incrementCountFailure(data: { id: string, error: string }) {
  return { type: types.INCREMENT_COUNT_FAILURE, id: data.id, error: data.error };
}

export function decrementCountRequest(id: string) {
  return { type: types.DECREMENT_COUNT_REQUEST, id };
}

export function decrementCountSuccess(id: string) {
  return { type: types.DECREMENT_COUNT_SUCCESS, id };
}

export function decrementCountFailure(data: { id: string, error: string }) {
  return { type: types.DECREMENT_COUNT_FAILURE, id: data.id, error: data.error };
}

export function destroyTopicRequest(id: string) {
  return { type: types.DESTROY_TOPIC_REQUEST, id };
}

export function destroyTopicSuccess(id: string) {
  return { type: types.DESTROY_TOPIC_SUCCESS, id };
}

export function destroyTopicFailure(data: { id: string, error: string }) {
  return { type: types.DESTROY_TOPIC_FAILURE, id: data.id, error: data.error };
}

export function createTopicRequest(data: { id: string, count: number, text: string }) {
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

export function createTopicFailure(data: { id: string, error: string }) {
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

export function typing(text: string) {
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

export function getTopicsSuccess(data: Topic[]) {
  return {
    type: types.GET_TOPICS_SUCCESS,
    data,
  };
}

export function getTopicsFailure(error: Error) {
  return {
    type: types.GET_TOPICS_FAILURE,
    error,
  };
}
