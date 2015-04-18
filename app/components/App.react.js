var React = require('react');
var Iso = require('iso');
var { RouteHandler, Link } = require('react-router');
var IsomorphicRouterRenderer = require('../utils/IsomorphicRouterRenderer');
var alt = require('../alt');

var App = React.createClass({
  render: function(){
    return (
      <div>
      	<Link to="/" className="navwrapper__logo">Ninja Ocean</Link>
      	<Link to="about">About</Link>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;