/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var TopicActions = require('../actions/TopicActions');
var TopicTextInput = require('./TopicTextInput.react');
var classnames = require('classnames');

var TopicItem = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    var input;

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li key={this.props.id}>
        <div className="view">
          <label onDoubleClick={this._onDoubleClick}>
            {this.props.text}
          </label>
          <button className="increment" onClick={this._onIncrement}>+</button>
          <button className="decrement" onClick={this._onDecrement}>-</button>
          <button className="destroy" onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
        </div>
      </li>
    );
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  _onIncrement: function() {
    TopicActions.increment(this.props.id);
  },

  _onDecrement: function() {
    //TopicActions.decrement(this.props.id);
  },

  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TopicActions.updateText(this.props.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TopicActions.destroy(this.props.id);
  }

});

module.exports = TopicItem;