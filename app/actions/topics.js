// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
import fetch from 'isomorphic-fetch';
import { md5 } from 'blueimp-md5';
import * as types from 'constants';

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
function makeTopicRequest(method, data, api='/topic') {
  return fetch(api, {
    method: method,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function increment(index) {
  return { type: types.INCREMENT_COUNT, index };
}

function decrement(index) {
  return { type: types.DECREMENT_COUNT, index };
}

function destroy(index) {
  return { type: types.DESTROY_TOPIC, index };
}


export function typing(text) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
function createTopicRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

function createTopicFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    ex: data.ex
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createTopic(text) {
  return dispatch => {
    if (text.trim().length <= 0) return;
    const id = md5(text);
    const data = {
      id,
      count: 1,
      text
    };

    // First dispatch an optimistic update
    dispatch(createTopicRequest(data));

    return makeTopicRequest('post', data)
      .then(res => {
        if (res.ok) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          return;
        } else {
          throw new Error("Oops! Something went wrong and we couldn't create your topic");
        }
      })
      .catch(ex => {
        dispatch(createTopicFailure({ id, ex: ex.message }));
      });
  };
}

export function incrementCount(id, index) {
  return dispatch => {
    dispatch(increment(index));

    return makeTopicRequest('put', {
        id: id,
        isFull: false,
        isIncrement: true
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

export function decrementCount(id, index) {
  return dispatch => {
    dispatch(decrement(index));
    return makeTopicRequest('put', {
        id: id,
        isFull: false,
        isIncrement: false
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

export function destroyTopic(id, index) {
  return dispatch => {
    dispatch(destroy(index));
    return makeTopicRequest('delete', {
        id: id
      });
    // do something with the ajax response
    // You can also dispatch here
    // E.g.
    // .then(response => {});
  };
}

