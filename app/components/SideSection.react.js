/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var TopicActionCreators = require('../actions/TopicActionCreators');
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
    TopicActionCreators.destroyCompleted();
  }

});

module.exports = SideSection;