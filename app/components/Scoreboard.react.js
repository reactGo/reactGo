var React = require('react');
var TopicCountItem = require('./TopicCountItem.react');
var PropTypes = React.PropTypes;

var Scoreboard = React.createClass({
  propTypes: {
    topics: PropTypes.object
  },
  /**
   * @return {object}
   */
  render: function() {
    var topicListItems = this.props.topics.map(function(topic) {
      return (<TopicCountItem key={topic.get('id')} title={topic.get('text')} count={topic.get('count')}/>);
    });

    return (
      <div className="scoreboard">
        <h3 className="scoreboard__header">Vote count</h3>
        <ul className="scoreboard__list">
          {topicListItems}
        </ul>
      </div>
    );
  }

});

module.exports = Scoreboard;
