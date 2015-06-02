var React = require('react');
var AnimationMixin = require('../mixins/AnimationMixin');
var classnames = require('classnames');

var About = React.createClass({
  mixins: [AnimationMixin],
  getInitialState: function() {
    return {
      opaque: false
    };
  },
  componentWillMount: function() {
    this.setState({
      opaque: true
    });
  },

  render: function() {
    var text = 'About Ninja Ocean';
    return (
      <div>
        <h1 className={classnames({
          'opaque--true': this.state.opaque,
          'opaque--false': !this.state.opaque
        })}>
            {this.createTextTransition(text)}
        </h1>
        <p className={classnames({
          move: this.state.opaque
        })}>Ninja Ocean is comprised of a team of passionate technology experts, aimed to do good.</p>
      </div>
    );
  }
});

module.exports = About;
