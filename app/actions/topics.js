import * as types from 'constants/actionTypes';
import 'es6-promise';
import fetch from 'isomorphic-fetch';
import TopicWebAPIUtils from 'utils/TopicWebAPIUtils';


export function typing(text) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

function create(data) {
  return {
    type: types.CREATE_TOPIC,
    id: data.id,
    count: data.count,
    text: data.text
  };
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
export function createTopic(text) {

  return dispatch => {

    if (text.trim().length <= 0) {
      return;
    }

    const data = {
      id: Date.now().toString(),
      count: 1,
      text: text
    };

    dispatch(create(data));

    return fetch('/topic', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      // do something
    });

  };
  
}

export function incrementCount(id, index) {

  return dispatch => {
    dispatch(increment(index));
    return TopicWebAPIUtils.updateTopic({ id: id }, false, true);
  };
}

export function decrementCount(id, index) {
  return dispatch => {
    dispatch(decrement(index));
    return TopicWebAPIUtils.updateTopic({ id: id }, false, false);
  };
}

export function destroyTopic(id, index) {
  return dispatch => {
    dispatch(destroy(index));
    return TopicWebAPIUtils.deleteTopic({ id: id });
  };
}

