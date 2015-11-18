import Immutable from 'immutable';
import TopicActions from 'actions/TopicActions';
import { fromJSOrdered } from 'utils/immutableHelpers';
import alt from 'altInstance';

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
    // Do not think we need an Immutable object here
    this.newTopic = '';

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
      handleDecrement: TopicActions.DECREMENT,
      handleCreate: TopicActions.CREATE,
      handleDestroy: TopicActions.DESTROY,
      handleTyping: TopicActions.TYPING
    });
  }

  bootstrap() {
    if (!Immutable.OrderedMap.isOrderedMap(this.topics)) {
      this.topics = fromJSOrdered(this.topics);
    }
    this.newTopic = '';
  }

  handleIncrement(id) {
    const topic = this.topics.get(id);
    const count = topic.get('count');
    this.topics = this.topics.set(id, topic.set('count', count + 1));
    this.emitChange();
  }

  handleDecrement(id) {
    const topic = this.topics.get(id);
    const count = topic.get('count');
    this.topics = this.topics.set(id, topic.set('count', count - 1));
    this.emitChange();
  }

  handleCreate(data) {
    const id = data.id;
    this.topics = this.topics.set(id, Immutable.fromJS(data));
    this.emitChange();
  }

  handleDestroy(id) {
    this.topics = this.topics.delete(id);
    this.emitChange();
  }

  handleTyping(text) {
    // Check if it already exists
    this.newTopic = text;
    this.emitChange();
    // otherwise, it is unchanged.
  }

}

// Export our newly created Store
export default alt.createStore(TopicStore, 'TopicStore');
