var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('../components/Navigation.react');

require('../scss/main.scss');

var App = React.createClass({
  displayName: 'App',
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
