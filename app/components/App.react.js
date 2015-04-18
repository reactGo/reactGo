var React = require('react');
var Iso = require('iso');
var { RouteHandler, Link } = require('react-router');
var IsomorphicRouterRenderer = require('../utils/IsomorphicRouterRenderer');
var alt = require('../alt');
var Navigation = require('../components/Navigation.react');

var App = React.createClass({
  render: function(){
    return (
      <div>
      	<Navigation />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;