import {
  TYPING,
  CREATE_TOPIC,
  DESTROY_TOPIC,
  INCREMENT_COUNT,
  DECREMENT_COUNT } from 'constants/actionTypes';


export default function topic(state = {}, action) {
  switch (action.type) {
    case TYPING:
      return Object.assign({}, state,
        { newTopic: action.newTopic }
      );
    case CREATE_TOPIC:
      return {
        topics: [...state.topics, { id: action.id, count: action.count, text: action.text } ],
        newTopic: ''
      };
    case DESTROY_TOPIC:
      return {
        topics: [...state.topics.filter((tp, i) => i !== action.index)],
        newTopic: state.newTopic
      };
    case INCREMENT_COUNT:
      return {
        topics: [
        ...state.topics.slice(0, action.index),
        Object.assign({}, state.topics[action.index], {
          count: state.topics[action.index].count + 1
        }),
        ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };
    case DECREMENT_COUNT:
      return {
        topics: [
        ...state.topics.slice(0, action.index),
        Object.assign({}, state.topics[action.index], {
          count: state.topics[action.index].count - 1
        }),
        ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };

    default:
      return state;
  }
}
