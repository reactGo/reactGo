var $ = require('jquery');
var TopicServerActionCreators = require('../actions/TopicServerActionCreators');

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
				TopicServerActionCreators.receiveAllTopics(data);
			}, function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			});
	},
	addTopic: function(topic) {
		$.ajax({
			url: '/topic',
			data: JSON.stringify(topic),
			type: 'POST',
			contentType: 'application/json'
		})
            .then(function(data, textStatus, jqXHR) {
            	// Currently this dispatches an event, but it is not required
                TopicServerActionCreators.receiveCreatedTopic(data);
            }, function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                TopicServerActionCreators.failedToCreateTopic(topic, errorThrown);
            });
	},

	updateTopic: function(topic) {
		$.ajax({
			url: '/topic',
			data: JSON.stringify(topic),
			type: 'PUT',
			contentType: 'application/json'
		})
			.then(function(data, textStatus, jqXHR) {
				console.log(data);
			}, function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			});
	},

	deleteTopic: function(id) {
		$.ajax({
			url: '/topic',
			data: JSON.stringify({id: id}),
			contentType: 'application/json',
			type: 'DELETE'
		})
			.then(function(data, textStatus, jqXHR) {
				console.log(data);
			}, function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			});
	},

	/**
	 * Listens to the 'topic change' event emitted by the server
	 * Whenever another client makes a change. This triggers us to call
	 * the getAllTopics() function. 
	 */
	listenToTopicChanges: function() {
		var hostname = document.location.hostname;
		var socket = io.connect('//' + hostname);
		var _this = this;
		socket.on('topic change', function() {
			_this.getAllTopics();
		});
	}
};