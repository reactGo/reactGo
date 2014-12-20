/* This code was modified from https://github.com/callemall/material-ui/blob/master/src/js/utils/events.js */
/* Modified to include IE8+ support */
module.exports = {
	once: function(el, type, callback) {
		var typeArray = type.split(' ');
		var recursiveFunction = function(e){
			e.target.removeEventListener(e.type, recursiveFunction);
			return callback(e);
		};
		for(var i = typeArray.length - 1; i > 0; i--) {
			on(el, typeArray[i], recursiveFunction);
		}
	},

	on: function(el, type, callback) {
		if(el.addEventListener) {
			el.addEventListener(type, callback);
		} else {
			el.attachEvent('on' + type, function() {
				callback.call(el);
			});
		}
	},

	off: function(el, type, callback) {
		if(el.removeEventListener) {
			el.removeEventListener(type, callback);
		} else {
			el.detachEvent('on' + type, callback);
		}
	}
};