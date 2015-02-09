/** @jsx React.DOM */

var React = require('react');
var Application = require('./components/App.react');
var TopicWebAPIUtils = require('./utils/TopicWebAPIUtils');

// Get all topics from server via Ajax call. This will create an action that will be dispatched to the Store.
TopicWebAPIUtils.getAllTopics();
// Commented to remove socket listening for a bit
//TopicWebAPIUtils.listenToTopicChanges();

React.render(
	<Application message='Welcome to Planet Bumi' />,
	document.getElementById('app')
);