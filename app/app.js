/** @jsx React.DOM */

var React = require('react');

var Application = React.createClass({
	render: function(){
		return (
			<div className="main-content">
				<h1>Hello World</h1>
				<p>{this.props.message}</p>
			</div>
		);
	}
});

React.render(
	<Application message='Welcome to Planet Earth' />,
	document.getElementById('content')
);