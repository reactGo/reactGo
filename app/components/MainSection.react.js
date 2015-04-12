/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var TopicItem = require('./TopicItem.react');

var MainSection = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    var topics = [];
    // Using forEach with side effects, I much rather use map
    this.props.topics.forEach(function(topic, key) {
      topics.push(<TopicItem id={topic.id} key={topic.id} text={topic.text} />);
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