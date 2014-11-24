/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions/Actions');
var TopicTextInput = require('./TopicTextInput.react');
var Statistics = require('./Statistics.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Trending Topics</h1>
        <h2>Top Topic</h2>
        <Statistics topTopic={this.props.topTopic} topStat={this.props.topStat} />
        <TopicTextInput
          id="new-topic"
          placeholder="What is your concern?"
          onSave={this._onSave}
        />
      </header>
    );
  },

  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      Actions.create(text);
    }

  }

});

module.exports = Header;