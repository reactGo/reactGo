// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
import fetch from 'isomorphic-fetch';
import * as types from 'constants/actionTypes';

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
  return { type: types.INCREMENT_COUNT, index: index };
}

function decrement(index) {
  return { type: types.DECREMENT_COUNT, index: index };
}

function destroy(index) {
  return { type: types.DESTROY_TOPIC, index: index};
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
function create(data) {
  return {
    type: types.CREATE_TOPIC,
    id: data.id,
    count: data.count,
    text: data.text
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createTopic(text) {
  
  return dispatch => {
    if (text.trim().length <= 0) return;
    const data = {
      id: Date.now().toString(),
      count: 1,
      text: text
    };

    // First dispatch an optimistic update
    dispatch(create(data));

    return makeTopicRequest('post', data)
      .then(response => {
        // do something with the ajax response
        // You can also dispatch here
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
      })
      .then(response => {
        // do something with the ajax response
        // You can also dispatch here
      });

  };
}

export function decrementCount(id, index) {
  return dispatch => {
    dispatch(decrement(index));
    return makeTopicRequest('put', {
        id: id,
        isFull: false,
        isIncrement: false
      })
      .then(response => {
        // do something with the ajax response
        // You can also dispatch here
      });
  };
}

export function destroyTopic(id, index) {
  return dispatch => {
    dispatch(destroy(index));
    return makeTopicRequest('delete', {
        id: id
      })
      .then(response => {
        // do something with the ajax response
        // You can also dispatch here
      });
  };
}

