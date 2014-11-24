var Promise = require('e6-promise').Promise;
var merge = require('react/lib/merge');

var _callbacks = [];
var _promises = [];

/**
 * The Dispatcher is the central hub that manages all data flow in a Flux application. It is essentially a registry
 * of callbacks into the stores. Each store registers itself and provides a callback. When the dispatcher is invoked in
 * an action creator method, all stores in the application are sent a data payload via the callbacks in the registry.
 *
 * As an application grows, the dispatcher becomes more vital, as it can manage dependencies between stores by invoking the
 * registered callbacks in a specific order. Stores can declaratively wait for other stores to finish updating, and then update
 * themselves accordingly.
 *
 */
var Dispatcher = function() {};
Dispatcher.prototype = merge(Dispatcher.prototype, {

	/**
	 * Register a Store's callback so that it may be invoked by an action.
	 * @param {function} callback The callback to be registered.
	 * @return {number} The index of the callback within the _callbacks array.
	 *
	 */
	 register: function(callback) {
	 	_callbacks.push(callback);
	 	return _callbacks.length - 1; // index
	 },

	 /**
	  * dispatch
	  * @param {object} payload The data from the action.
	  */
	  dispatch: function(payload) {
	  	// First create the array of promises for callbacks to reference
	  	var resolves = [];
	  	var rejects = [];
	  	_promises = _callbacks.map(function(_, i) {
	  		// The resolver function is called with the ability to resolve or reject the promise
	  		return new Promise(function(resolve, reject) {
	  			resolves[i] = resolve;
	  			rejects[i] = reject;
	  		});
	  	});

	  	// Dispatch to callbacks and resolve/reject promises.
	  	_callbacks.forEach(function(callback, i){
	  		// Callback can return an obj, to resolve, or a promise, to chain.
	  		// See waitFor() for why this might be useful.
	  		Promise.resolve(callback(payload)).then(function() {
	  			// define what to do when promise is fulfilled.
	  			resolves[i](payload);
	  		}, function() {
	  			// define what to do when promise is rejected.
	  			rejects[i](new Error('Dispatcher callback unsuccessful'));
	  		});
	  	});
	  	_promises = [];
	  }
});

module.exports = Dispatcher;
