var React = require('react');
var TopicActions = require('../actions/TopicActions');
var ENTER_KEY_CODE = 13;

// Code modified from https://github.com/facebook/flux/blob/master/examples/flux-todomvc/js/components/TopicTextInput.react.js
var TopicTextInput = React.createClass({
  render: function() {
    return (
      <input className={this.props.className} placeholder={this.props.placeholder} onChange={this._onChange}
        onKeyDown={this._onKeyDown} value={this.props.value}
        autoFocus={true} />
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  _save: function() {
    this.props.onSave(this.props.value);
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways. I personally think this makes it more reusable.
   */
  _onChange: function(event) {
    this.props.onChange(event.target.value);
  },

  /**
   * @param  {object} event
   */
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }

});

module.exports = TopicTextInput;