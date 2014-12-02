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
	},
	addTopic: function(topic) {
		$.ajax({
			url: '/topic',
			data: JSON.stringify(topic),
			type: 'POST',
			contentType: 'application/json'
		})
			.then(function(data, textStatus, jqXHR) {
				console.log(data);
			}, function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
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
	}
};