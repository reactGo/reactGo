var React = require('react');
var AnimationMixin = require('../mixins/AnimationMixin');
var cx = require('react/lib/cx');

require('../../scss/components/_animations.scss');

var About = React.createClass({
  mixins: [AnimationMixin],
  getInitialState: function() {
  	return {
  		opaque: false
  	};
  },
  componentDidMount: function() {
  	this.setState({
  		opaque : true
  	})
  },

  render: function() {
  	var text = 'About Ninja Ocean';
    return (
      <h1 className={cx({
      	'opaque--true': this.state.opaque,
      	'opaque--false': !this.state.opaque
      })}>
          {this.createTextTransition(text)}
      </h1>
    );
  }
});

module.exports = About;