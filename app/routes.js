var { Route, DefaultRoute  }= require('react-router');
var React = require('react');
var App = require('./components/App.react');
var Vote = require('./components/Vote.react');
var About = require('./components/About.react');

var routes = (
  <Route name="app" path="/" handler={App}>
  	<Route name="vote" handler={Vote} />
    <Route name="about" handler={About} />
    <DefaultRoute handler={Vote} />
  </Route>
);

module.exports = routes;