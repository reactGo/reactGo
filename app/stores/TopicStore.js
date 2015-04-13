var TopicWebAPIUtils = require('../utils/TopicWebAPIUtils');
var TopicActions = require('../actions/TopicActions');
var Immutable = require('immutable');
var alt = require('../alt');

// var _topics = {}; // Collection of todo items

// /**
//  * Create a TOPIC item.
//  * @param {string} text The context of the TODO
//  */
// function create(text) {
//   // Using the current timestamp in place of a real id.
//   var id = Date.now().toString();
//   return {
//     id: id,
//     count: 1,
//     text: text
//   };
// }

// /**
//  * Update the count of Topic
//  */
// function updateCount(id, update) {
//   _topics[id].count = _topics[id].count + update;
//   TopicWebAPIUtils.updateTopic(_topics[id]);
// }

// *
//  * Update a TOPIC item.
//  * @param  {string} id
//  * @param {object} updates An object literal containing only the data to be
//  *     updated.
 
// function update(id, updates) {
//   _topics[id] = assign({}, _topics[id], updates);
// }

// /**
//  * Update all of the TODO items with the same object.
//  *     the data to be updated.  Used to mark all TODOs as completed.
//  * @param  {object} updates An object literal containing only the data to be
//  *     updated.
//  */
// function updateAll(updates) {
//   // This is inefficient
//   for (var id in _topics) {
//     update(id, updates);
//   }
// }

// /**
//  * Delete a TODO item.
//  * @param  {string} id
//  */
// function destroy(id) {
//   delete _topics[id];
//   TopicWebAPIUtils.deleteTopic(id);
// }

/**
 * Flux Explanation of Store:
 * Stores contain the application state and logic. Their role is somewhat similar to a model in a traditional MVC, but
 * they manage the state of many objects. Nor are they the same as Backbone's collections. More than simply managing a
 * collection of ORM-style objects, stores manage the application state for a particular domain within the application.
 *
 * A store registers itself with the dispatcher and provides it with a callback. This callback receives a data payload
 * as a parameter. The payload contains an action with an attribute identifying the action's type. Within the store's
 * registered callback, a switch statement based on the action's type is used to interpret the payload and to provide the
 * proper hooks into the store's internal methods. This allows an action to result in an update to the state of the store,
 * via the dispatcher. After all the stores are updated, they broadcast an event declaring that their state has changed,
 * so the views may query the new state and update themselves.
 *
 * Alt Implementation of Stores:
 * These are the stores returned by alt.createStore, they will not have the methods defined in your StoreModel because flux
 * stores do not have direct setters. However, any static methods defined in your StoreModel will be transferred to this object.
 * 
 * Please note: Static methods defined on a store model are nothing more than synthetic sugar for exporting the method as a public
 * method of your alt instance. This means that `this` will be bound to the store instance. It is recommended to explicitly export
 * the methods in the constructor using StoreModel#exportPublicMethods.
 *
 */
class TopicStore {
  /*
   * The constructor of your store definition receives the alt instance as its first and only argument. All instance variables,
   * values assigned to `this`, in any part of the StoreModel will become part of state.
   */
  constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    this.topics = Immutable.OrderedMap({});
    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);
    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your 
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
      handleIncrement: TopicActions.INCREMENT,
      handleCreate: TopicActions.CREATE
    });
  }

  bootstrap() {
    if(! Immutable.OrderedMap.isOrderedMap(this.topics)) {
      this.topics = Immutable.fromJS(this.topics);
    }
  }

  handleIncrement(data) {
    this.emitChange();
  }

  handleCreate(data) {
    // merge(): Returns a new Map resulting from merging the provided Iterables (or JS objects) into this Map.
    // In other words, this takes each entry of each iterable and sets it on this Map
    var id = data.id;
    this.topics = this.topics.set(id, data);
    this.emitChange();
  }
}

// Export our newly created Store
module.exports = alt.createStore(TopicStore, 'TopicStore');
console.log(alt);
// var TopicStore = assign({}, EventEmitter.prototype, {

//   /**
//    * Initialize store with topics queried from server.
//    * @param {Object} topics
//    */
//   init: function(rawTopics) {
//     _topics = _.chain(rawTopics)
//       .map(function(topic){
//         topic.id = topic.id;
//         return [topic.id, topic];
//       })
//       .object()
//       .value();
//   },

//   /**
//    * Get the entire collection of Topics.
//    * @return {object}
//    *
//    */
//   getAllTopics: function() {
//     return _topics;
//   },

//   getTopTopic: function() {
//     var sum, topTopic, stat;

//     sum = _.reduce(_topics, function(sum, topic) {
//       return sum + topic.count;
//     }, 0);

//     topTopic = _.max(_topics, function(topic) {
//       return topic.count;
//     });

//     // Make sure this is accepted in Node
//     stat = isNaN(topTopic.count /sum) ? 0 : topTopic.count/ sum * 100;

//     return assign({}, topTopic, {'stat': stat});
//   },

//   getCreatedTopicData: function(text) {
//     var timeStamp = Date.now();

//     return {
//       id: timeStamp,
//       count: 1,
//       text: text
//     };

//   },

//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   },

//   /**
//    * @param {function} callback
//    */
//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   },

//   /**
//    * @param {function} callback
//    */
//   removeChangeListener: function(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   }

// });


// // Register to handle all updates
// AppDispatcher.register(function(action) {
//   var text;

//   switch(action.actionType) {
//     case Constants.CREATE_TOPIC:
//       text = action.text.trim();
//       if( text.length > 0 ) {
//         var topic = TopicStore.getCreatedTopicData(text);
//         _topics[topic.id] = topic;
//         TopicStore.emitChange();
//       }
//       break;

//     case Constants.TOPIC_INCREMENT:
//       updateCount(action.id, 1);
//       TopicStore.emitChange();
//       break;

//     case Constants.TOPIC_DECREMENT:
//       updateCount(action.id, -1);
//       TopicStore.emitChange();
//       break;

//     case Constants.TOPIC_DESTROY:
//       destroy(action.id);
//       TopicStore.emitChange();
//       break;

//     case Constants.RECEIVE_RAW_TOPICS:
//       TopicStore.init(action.data);
//       TopicStore.emitChange();
//       break;

//     case Constants.FAILED_TO_CREATE_TOPIC:
//       destroy(action.id);
//       // Tell the notifier the reason
//       TopicStore.emitChange();
//       break;
//     default:
//   }

// });

// module.exports = TopicStore;
