var Immutable = require('immutable');
var NoteActions = require('../actions/NoteActions');
var alt = require('../alt');
var _ = require('lodash');

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
class NoteStore {

  /*
   * The constructor of your store definition receives the alt instance as its first and only argument. All instance variables,
   * values assigned to `this`, in any part of the StoreModel will become part of state.
   */
  constructor() {
    // Instance variables defined anywhere in the store will become the state. You can initialize these in the constructor and
    // then update them directly in the prototype methods
    this.notes = Immutable.OrderedMap({});
    // Do not think we need an Immutable object here

    // (lifecycleMethod: string, handler: function): undefined
    // on: This method can be used to listen to Lifecycle events. Normally they would set up in the constructor
    this.on('init', this.bootstrap);
    this.on('bootstrap', this.bootstrap);
    // (listenersMap: object): undefined
    // bindListeners accepts an object where the keys correspond to the method in your
    // StoreModel and the values can either be an array of action symbols or a single action symbol.
    // Remember: alt generates uppercase constants for us to reference
    this.bindListeners({
      handleSaveNote: NoteActions.SAVENOTE,
      handleGetNotes: NoteActions.GETNOTES
    });
  }

  bootstrap() {
    if (!Immutable.OrderedMap.isOrderedMap(this.notes)) {
      this.notes = Immutable.fromJS(this.notes);
    }
  }

  handleSaveNote(data) {
    var id = data.id;
    var length = this.notes.size;
    // Adding order so we can easily sort the order
    _.merge(data, {
      order: length
    });
    this.notes = this.notes.set(id, Immutable.fromJS(data));
    this.emitChange();
  }

  handleGetNotes(data) {
    var newNotes = _.chain(data)
                    .map(function(note) {
                      return [note.id, note];
                    })
                    .zipObject()
                    .value();
    console.log(newNotes);
    this.notes = Immutable.fromJS(newNotes);

    this.emitChange();
  }

}

// Export our newly created Store
module.exports = alt.createStore(NoteStore, 'NoteStore');
