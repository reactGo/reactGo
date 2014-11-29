/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var Actions = require('../actions/Actions');
var TopicCountItem = require('./TopicCountItem.react');
var _ = require('lodash');

var SideSection = React.createClass({

  propTypes: {
    allTopics: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var allTopics = this.props.allTopics;
    var topicListItems = [];
    _.forEach(allTopics, function(topic){
      topicListItems.push(<TopicCountItem key={topic.id} title={topic.text} count={topic.count}/>);
    });

  	return (
      <div id="side-section">
        <h3>Tally</h3>
        <ul>
          {topicListItems}
        </ul>
      </div>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    Actions.destroyCompleted();
  }

});

module.exports = SideSection;