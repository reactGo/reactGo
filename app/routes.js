var React = require('react');
var { Route, DefaultRoute } = require('react-router');
var App = require('./components/App.react');
var Vote = require('./components/Vote.react');
var About = require('./components/About.react');
var Login = require('./components/Login.react');
var Logout = require('./components/Logout.react');
var Dashboard = require('./components/Dashboard.react');
var Profile = require('./components/Profile.react');
var PriorityList = require('./components/PriorityList.react');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="vote" handler={Vote} />
    <Route name="about" handler={About} />
    <Route name="dashboard" handler={Dashboard}>
      <Route name="profile" handler={Profile} />
      <Route name="list" handler={PriorityList} />
    </Route>
    <DefaultRoute handler={Vote} />
  </Route>
);

module.exports = routes;
