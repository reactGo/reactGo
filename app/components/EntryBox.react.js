var React = require('react');
var TopicActions = require('../actions/TopicActions');
var TopicTextInput = require('./TopicTextInput.react');
// var Statistics = require('./Statistics.react');
// var AnimationMixin = require('../mixins/AnimationMixin');

var EntryBox = React.createClass({
  propTypes: {
    topic: React.PropTypes.string
  },
  // mixins: [AnimationMixin],
  // getInitialState: function() {
  //   return {
  //     opaque: false
  //   };
  // },
  // componentDidMount: function() {
  //   this.setState({
  //     opaque : true
  //   })
  // },
  render: function() {
    // <Statistics topTopic={this.props.topTopic} topStat={this.props.topStat} />
    // <h1 className={classnames({
    //       'opaque--true': this.state.opaque,
    //       'opaque--false': !this.state.opaque
    //     })}>
    // {this.createTextTransition(text)}
    // </h1>
    return (
      <div className="entrybox">
        <h1 className="entrybox__header">Vote for your top hack idea</h1>
        <TopicTextInput className="entrybox__input" value={this.props.topic} placeholder="What's yer fav idea?" onChange={this._onChange} onSave={this._onSave} />
      </div>
    );
  },

  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    TopicActions.create(text);
  },

  /**
   * @param {object} event
   */
  _onChange: function(text) {
    TopicActions.typing(text);
  }

});

module.exports = EntryBox;
