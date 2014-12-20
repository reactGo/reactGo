/* This code was modified from https://github.com/callemall/material-ui/blob/master/src/js/mixins/window-listenable.js */

/* We are using our the events.js module here, instead of Node's Event Emitter module because this is specific to browser DOM elements */
var Events = require('../utils/events');
var _ = require('lodash');

module.exports = {

	componentDidMount: function() {
		var listeners = this.windowListeners;
		_.forIn(listeners, function(eventListener, eventName) {
			var callbackName = eventListener;
			Events.on(window, eventName, this[callbackName]);
		});
	},

	componentWillUnmount: function() {
		var listeners = this.windowListeners;
		_.forIn(listeners, function(eventListener, eventName) {
			var callbackName = eventListener;
			Events.off(window, eventName, this[callbackName]);
		});
	}
};