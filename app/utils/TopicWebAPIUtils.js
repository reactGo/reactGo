import $ from 'jquery';

/*
 * Following code reuse and dependencies guidelines from:
 * https://github.com/bendc/frontend-guidelines#dependencies
 */
const propIsEnumerable = Object.prototype.propertyIsEnumerable;

const toObject = (val) => {
  if (val == null) {
    throw new TypeError('Object assign cannot be called with null or undefined');
  }

  return Object(val);
};

const ownEnumerableKeys = (obj) => {
  let keys = Object.getOwnPropertyNames(obj);

  if (Object.getOwnPropertySymbols) {
    keys = keys.concat(Object.getOwnPropertySymbols(obj));
  }

  return keys.filter((key) => {
    return propIsEnumerable.call(obj, key);
  });
};

const assign = (() =>
  Object.assign ? Object.assign : (target, ...sources) => {
    let keys;
    let to = toObject(target);
    sources.forEach((val) => {
      keys = ownEnumerableKeys(Object(val));
      keys.forEach((key) => {
        to[key] = val[key];
      });
    });
    return to;
  }
)();

const merge = (...sources) => assign({}, ...sources);

const utils = {
  /*
   * @param topic provide a topic object
   *         {
   *           id: String,
   *           count: Number,
   *           text: String
   *         }
   * @return jqXHR object (which implements the Promise interface)
   */
  addTopic: (topic) => {
    return $.ajax({
      url: '/topic',
      data: JSON.stringify(topic),
      type: 'POST',
      contentType: 'application/json'
    });
  },

  /*
   * TODO: Make arguments more generic
   * @param Object - partial topic or id
   * @param Boolean - if this is a full update then we have to specify it
   * @param Boolean - true if increment, false if decrement
   */
  updateTopic: (topic, isFull, isIncrement) => {
    let data = merge(topic, {
      isFull: isFull,
      isIncrement: isIncrement
    });
    return $.ajax({
      url: '/topic',
      data: JSON.stringify(data),
      type: 'PUT',
      contentType: 'application/json'
    });
  },

  deleteTopic: (topic) => {
    return $.ajax({
      url: '/topic',
      data: JSON.stringify(topic),
      contentType: 'application/json',
      type: 'DELETE'
    });
  }

};

export default utils;
