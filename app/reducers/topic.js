import {
  TYPING,
  CREATE_TOPIC_REQUEST,
  CREATE_TOPIC_SUCCESS,
  CREATE_TOPIC_FAILURE,
  DESTROY_TOPIC_REQUEST,
  DESTROY_TOPIC_SUCCESS,
  DESTROY_TOPIC_FAILURE,
  INCREMENT_COUNT_REQUEST,
  INCREMENT_COUNT_SUCCESS,
  INCREMENT_COUNT_FAILURE,
  DECREMENT_COUNT_REQUEST,
  DECREMENT_COUNT_SUCCESS,
  DECREMENT_COUNT_FAILURE,
  GET_TOPICS_REQUEST,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAILURE } from 'types';


export default function topic(state = {
  topics: [],
  newTopic: ''
}, action) {
  switch (action.type) {
    case TYPING:
      return Object.assign({}, state,
        { newTopic: action.newTopic }
      );
    case GET_TOPICS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case GET_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        topics: action.payload
      });
    case GET_TOPICS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case CREATE_TOPIC_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case CREATE_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        topics: [...state.topics, action.payload],
        newTopic: ''
      });
    case CREATE_TOPIC_FAILURE:
      return {
        isFetching: false,
        topics: state.topics,
        newTopic: state.newTopic
      };
    case DESTROY_TOPIC_REQUEST:
      return {
        isFetching: true,
        topics: state.topics,
        newTopic: state.newTopic
      };
    case DESTROY_TOPIC_SUCCESS:
      return {
        isFetching: false,
        topics: state.topics.filter((obj) => obj._id !== action.payload._id),
        newTopic: state.newTopic
      };
    case DESTROY_TOPIC_FAILURE:
      return {
        isFetching: false,
        topics: state.topics,
        newTopic: state.newTopic
      };
    case INCREMENT_COUNT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case INCREMENT_COUNT_SUCCESS:
      return {
        isFetching: false,
        topics: [
          ...state.topics.slice(0, action.index),
          Object.assign({}, state.topics[action.index], {
            count: action.payload.count
          }),
          ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };
    case INCREMENT_COUNT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case DECREMENT_COUNT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DECREMENT_COUNT_SUCCESS:
      return {
        isFetching: false,
        topics: [
          ...state.topics.slice(0, action.index),
          Object.assign({}, state.topics[action.index], {
            count: action.payload.count
          }),
          ...state.topics.slice(action.index + 1)
        ],
        newTopic: state.newTopic
      };
    case DECREMENT_COUNT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
