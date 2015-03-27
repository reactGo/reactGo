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
      <div>
        <h1 className={cx({
        	'opaque--true': this.state.opaque,
        	'opaque--false': !this.state.opaque
        })}>
            {this.createTextTransition(text)}
        </h1>
        <p className={cx({
          'move': this.state.opaque
        })}>Ninja Ocean has is comprised of a team of passionate technology experts, aimed to do good.</p>
      </div>
    );
  }
});

module.exports = About;