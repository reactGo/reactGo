/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var TopicItem = require('./TopicItem.react');

var MainSection = React.createClass({

  propTypes: {
    allTopics: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allTopics).length < 1) {
      return null;
    }

    var allTopics = this.props.allTopics;
    var topics = [];

    for (var key in allTopics) {
      topics.push(<TopicItem key={key} topic={allTopics[key]} />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          />
        <label htmlFor="toggle-all">Toggle order</label>
        <ul id="todo-list">{topics}</ul>
      </section>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    Actions.toggleCompleteAll();
  }

});

module.exports = MainSection;