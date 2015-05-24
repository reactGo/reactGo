var React = require('react');
var TopicActions = require('../actions/TopicActions');
var TopicTextInput = require('./TextInput.react');

var EntryBox = React.createClass({
  propTypes: {
    topic: React.PropTypes.string
  },

  render: function() {

    return (
      <div className="entrybox">
        <h1 className="entrybox__header">Vote for your top hack idea</h1>
        <TopicTextInput className="entrybox__input" value={this.props.topic} placeholder="What's yer fav idea?" onChange={this._onChange} onSave={this._onSave} />
      </div>
    );
  },

  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    TopicActions.create(text);
  },

  /**
   * @param {object} event
   */
  _onChange: function(text) {
    TopicActions.typing(text);
  }

});

module.exports = EntryBox;
