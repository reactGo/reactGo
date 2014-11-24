/** @jsx React.DOM */
var React = require('react');

var TopicCountItem = React.createClass({
	render: function(){
		return (
			<li>
				<span>{this.props.title}</span>
				<span>{this.props.count}</span>
			</li>
		);
	}
});

module.exports = TopicCountItem;