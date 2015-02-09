/** @jsx React.DOM */

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

var Header = require('./Header.react');
var SideSection = require('./SideSection.react');
var MainSection = require('./MainSection.react');
var NavigationBar = require('./NavigationBar.react');
var LoginApp = require('./Login/Login.app.react');
var React = require('react');
var TopicStore = require('../stores/TopicStore');
var UserStore = require('../stores/UserStore');

function getState() {
	return {
		allTopics: TopicStore.getAll(),
		topTopic : TopicStore.getTopTopic(),
		user: UserStore.getUserData()
	};
}

var App = React.createClass({

	getInitialState: function() {
		return getState();
	},

	componentDidMount: function() {
        TopicStore.addChangeListener(this._onTopicChange);
        UserStore.addChangeListener(this._onUserChange);
	},

	componentWillUnmount: function() {
        TopicStore.removeChangeListener(this._onTopicChange);
        UserStore.removeChangeListener(this._onUserChange);
	},

	/**
	 * @return {object}
	 */
	render: function(){
		return (
			<div>
        <NavigationBar isLoggedIn={this.state.user.isLoggedIn} email={this.state.user.email}/>
        <LoginApp modal={this.state.user.modal} />
				<Header topTopic={this.state.topTopic.text} topStat={this.state.topTopic.stat}/>
				<SideSection allTopics={this.state.allTopics}/>
				<MainSection allTopics={this.state.allTopics} />
			</div>
		);
	},

    _onTopicChange: function() {
		this.setState({
            allTopics: TopicStore.getAll(),
            topTopic : TopicStore.getTopTopic()
        });
	},

	_onUserChange: function() {
		this.setState({
			user: UserStore.getUserData()
		});
	}
});

module.exports = App;


