import { 
  TYPING, 
  CREATE_TOPIC,
  DESTROY_TOPIC,
  INCREMENT_COUNT,
  DECREMENT_COUNT } from '../constants/actionTypes';
import _ from 'lodash';

export default function topics(state = [], action) {
  switch (action.type) {
  case TYPING:
    return Object.assign({}, state, 
      { newTopic: action.newTopic }
    );
  case CREATE_TOPIC:
    return  [...state, { id: action.id, count: action.count, text: action.text } ]
  case DESTROY_TOPIC:
    return [...state.splice(action.index, 1)];
  case INCREMENT_COUNT:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        count: state[action.index].count + 1
      }),
      ...state.slice(action.index + 1)
    ];
  case DECREMENT_COUNT:
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        count: state[action.index].count - 1
      }),
      ...state.slice(action.index + 1)
    ];

  default:
    return state;
  }
}
