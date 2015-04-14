/** @jsx React.DOM */
var React = require('react');
var TopicItem = require('./TopicItem.react');

var MainSection = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    
    var topics = this.props.topics.map(function(topic) {
      return (<TopicItem id={topic.get('id')} key={topic.get('id')} text={topic.get('text')} />);
    });
    return (
      <section id="main-section">
        <h3>Vote for your favorite burger place</h3>
        <ul id="topic-list">{topics}</ul>
      </section>
    );
  }

});

module.exports = MainSection;