var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({

  render: function() {
    return (
      <div className="dashboard">
        <div className="dashboard__navigation dashboard__navigation--left-bar">
          <h1 className="dashboard__header">Your Dashboard</h1>
          <ul className="dashboard__list">
            <li className="dashboard__list-item"><Link to="profile">Profile</Link></li>
            <li className="dashboard__list-item"><Link to="list">My list</Link></li>
          </ul>
        </div>
        <div className="dashboard__main">
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
