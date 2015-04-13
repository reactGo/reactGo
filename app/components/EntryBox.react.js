/** @jsx React.DOM */
var React = require('react');
var TopicActions = require('../actions/TopicActions');
var TopicTextInput = require('./TopicTextInput.react');
var Statistics = require('./Statistics.react');
var AnimationMixin = require('../mixins/AnimationMixin');
var classnames = require('classnames');

// require('../../scss/components/_animations.scss');

var EntryBox = React.createClass({
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
  /**
   * @return {object}
   */
  render: function() {
    var text = 'Trending Burger Places';
    // <Statistics topTopic={this.props.topTopic} topStat={this.props.topStat} />
    return (
      <header id="header">
        <h1 className={classnames({
          'opaque--true': this.state.opaque,
          'opaque--false': !this.state.opaque
        })}>
            {this.createTextTransition(text)}
        </h1>
        <h2>Top Burger</h2>
        
        <TopicTextInput
          id="new-topic"
          placeholder="Fav burger?"
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
      TopicActions.create(text);
    }
  }

});

module.exports = EntryBox;