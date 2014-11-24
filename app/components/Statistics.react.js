/** @jsx React.DOM */
var React = require('react');
var Statistics = React.createClass({
	render: function(){
		return (
			<div>
				<span>{this.props.topTopic}</span>
				<span>{this.props.topStat + '%'}</span>
			</div>
		);
	}
});

module.exports = Statistics;