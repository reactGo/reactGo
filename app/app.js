/** @jsx React.DOM */

var React = require('react');
var Application = require('./components/App.react');

React.render(
	<Application message='Welcome to Planet Bumi' />,
	document.getElementById('app')
);