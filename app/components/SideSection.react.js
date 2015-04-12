/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var TopicActions = require('../actions/TopicActions');
var TopicCountItem = require('./TopicCountItem.react');

var SideSection = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    var topicListItems = [];
    this.props.topics.forEach(function(topic, key){
      topicListItems.push(<TopicCountItem key={key} title={topic.text} count={topic.count}/>);
    });

  	return (
      <div id="side-section" className="card">
        <h3 className="card-content">Tally</h3>
        <ul className="card-content">
          {topicListItems}
        </ul>
      </div>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    TopicActions.destroyCompleted();
  }

});

module.exports = SideSection;