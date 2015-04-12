/** @jsx React.DOM */
var React = require('react');
//var EntryBox = require('./EntryBox.react');
// var MainSection = require('./MainSection.react');
// var SideSection = require('./SideSection.react');
var TopicStore = require('../stores/TopicStore');

// require('../../scss/components/_vote.scss');

/*
 * This component operates as a "Controller-View". It listens for changes in the
 * Store and passes the new data to its children.
 *
 * React provides the kind of composable views we need for the view layer. Close to the top of the nested view hierarchy,
 * a special kind of view listens for events that are broadcast by the stores that it depends on. One could call this a
 * controller-view, as it provides the glue code to get the data from the stores and to pass this data down the chain of its
 * descendants. We might have one of these controller views governing any significant section of the page.
 *
 * When it receives an event from the store, it first requires the new data via the store's public getter methods. It then calls
 * its own setState() or forceUpdate() methods, causing its own render() method and the render() method of all its descendants to run.
 *
 * We often pass the entire state of the store down the chain of views in a single object, allowing different descendants to use
 * what they need. In addition to keeping the controller-like behavior at the top of the hierarchy, and thus keeping our descendant
 */
var Vote = React.createClass({
  
  getInitialState: function() {
    // topTopic: TopicStore.getTopTopic(),
    return {
      allTopics: TopicStore.getState().topics
    };
  },

  componentDidMount: function() {
    TopicStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    TopicStore.unlisten(this.onChange);
  },

  onChange: function() {
    // topTopic: TopicStore.getTopTopic(),
    this.setState({
      allTopics: TopicStore.getState().topics
    });
  },

  render: function() {
    /*
    <div className="vote__body">
          <MainSection topics={this.state.allTopics.topics} />
          <SideSection topics={this.state.allTopics.topics} />
        </div>
    */
    console.log(this.state.allTopics);
    return(
      <div className="vote">
        <h1>Ken</h1>
      </div>
    );
  }
});

module.exports = Vote;