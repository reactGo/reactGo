var React = require('react');
var TopicActions = require('../actions/TopicActions');
var PropTypes = React.PropTypes;

var TopicItem = React.createClass({
  propTypes: {
    id: PropTypes.string,
    text: PropTypes.string
  },

  render: function() {
    return (
      <li className="topic-item" key={this.props.id}>
        <span className="topic-item__topic">{this.props.text}</span>
        <button className="topic-item__button topic-item__button--increment" onClick={this._onIncrement}>+</button>
        <button className="topic-item__button topic-item__button--decrement" onClick={this._onDecrement}>-</button>
        <button className="topic-item__button topic-item__button--destroy" onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
      </li>
    );
  },

  _onIncrement: function() {
    TopicActions.increment(this.props.id);
  },

  _onDecrement: function() {
    TopicActions.decrement(this.props.id);
  },

  _onDestroyClick: function() {
    TopicActions.destroy(this.props.id);
  }

});

module.exports = TopicItem;
