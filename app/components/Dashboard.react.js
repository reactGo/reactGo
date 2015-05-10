var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
  render: function() {
    return (
      <div className="dashboard">
        <h1>Welcome to dashboard</h1>
        <ul className="dashboard__primary-navigation">
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="list">My list</Link></li>
        </ul>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Dashboard;
