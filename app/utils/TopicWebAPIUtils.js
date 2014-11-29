var $ = require('jquery');
var ServerActions = require('../actions/ServerActions');

// Placing configuration here, might consider moving it elsewhere
var defaultConfig = {
	url: '/topic',
	type: 'GET',
	dataType: 'json'
};

module.exports = {
	getAllTopics: function() {
		$.ajax(defaultConfig)
			.then(function(data, textStatus, jqXHR) {
				ServerActions.receiveCreatedTopics(data);
			}, function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			});
	}
};