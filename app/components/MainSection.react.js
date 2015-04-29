var React = require('react');
var TopicItem = require('./TopicItem.react');
var PropTypes = React.PropTypes;

var MainSection = React.createClass({
  propTypes: {
    topics: PropTypes.object
  },
  /**
   * @return {object}
   */
  render: function() {
    var topics = this.props.topics.map(function(topic) {
      return (<TopicItem id={topic.get('id')} key={topic.get('id')} text={topic.get('text')} />);
    });
    return (
      <div className="main-section">
        <h3 className="main-section__header">Vote for your favorite hack day idea</h3>
        <ul className="main-section__list">{topics}</ul>
      </div>
    );
  }

});

module.exports = MainSection;
