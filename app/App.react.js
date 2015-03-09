/** @jsx React.DOM */



var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Vote = require('./components/Vote.react');
var NavigationBar = require('./components/NavigationBar.react');
var Login = require('./components/Login.react');
var Logout = require('./components/Logout.react');
var About = require('./components/About.react');
var Dashboard = require('./components/Dashboard.react');
var TopicWebAPIUtils = require('./utils/TopicWebAPIUtils');

// Get all topics from server via Ajax call. This will create an action that will be dispatched to the Store.
TopicWebAPIUtils.getAllTopics();
// Commented to remove socket listening for a bit
//TopicWebAPIUtils.listenToTopicChanges();

var App = React.createClass({
  render: function(){
    return (
      <div>
        <NavigationBar />
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="vote" handler={Vote} />
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="about" handler={About} />
    <Route name="dashboard" handler={Dashboard} />
    <DefaultRoute handler={Vote} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});

module.exports = App;