/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var TopicItem = require('./TopicItem.react');
var _ = require('lodash');

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

    _.forEach(allTopics, function(value, key){
      topics.push(<TopicItem id={key} key={key} topic={value} />);
    });

    return (
      <section id="main-section">
        <h3>Vote</h3>
        <ul id="topic-list">{topics}</ul>
      </section>
    );
  }

});

module.exports = MainSection;