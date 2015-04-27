var React = require('react');

var Logout = React.createClass({
  render: function() {
    return (
      <div className="logout">
        <h1 className="logout__header">Hey m8, you have been logged out</h1>
      </div>
    );
  }
});

module.exports = Logout;