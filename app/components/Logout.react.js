/** @jsx React.DOM */
var React = require('react');

var Logout = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hey m8, you've been logged out</h1>
      </div>
    );
  }
});

module.exports = Logout;