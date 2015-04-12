/** @jsx React.DOM */

var React = require('react');
// var Router = require('react-router');
// var Link = Router.Link;
// var Route = Router.Route;
// var RouteHandler = Router.RouteHandler;
// var DefaultRoute = Router.DefaultRoute;
var Vote = require('./components/Vote.react');
var alt = require('./alt');
var Iso = require('iso');
// var NavigationBar = require('./components/NavigationBar.react');
// var Login = require('./components/Login.react');
// var Logout = require('./components/Logout.react');
// var About = require('./components/About.react');
// var Dashboard = require('./components/Dashboard.react');
// var TopicWebAPIUtils = require('./utils/TopicWebAPIUtils');

// Commented to remove socket listening for a bit
//TopicWebAPIUtils.listenToTopicChanges();

// var App = React.createClass({
//   render: function(){
//     //<NavigationBar />
//     return (
//       <div>
//         <RouteHandler/>
//       </div>
//     );
//   }
// });

// var routes = (
//   <Route name="app" path="/" handler={App}>
//     <Route name="vote" handler={Vote} />
//     <Route name="login" handler={Login} />
//     <Route name="logout" handler={Logout} />
//     <Route name="about" handler={About} />
//     <Route name="dashboard" handler={Dashboard} />
//     <DefaultRoute handler={Vote} />
//   </Route>
// );

// enable touch events
// React.initializeTouchEvents(true);
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.querySelector('#app'));
// });

Iso.bootstrap(function(state, _, container) {
	console.log(state);
  alt.bootstrap(state);

  React.render(<Vote />, document.querySelector('#app'));
});