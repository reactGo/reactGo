/** jsx@React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../stores/UserStore');

//requiring nav styles
require('../..//scss/components/_navbar.scss');

var NavigationBar = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.getUserData()
    };
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onUserChange);
  },

  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onUserChange);
  },

  _onUserChange: function() {
    this.setState({
      user: UserStore.getUserData()
    });
  },


  render: function() {
    var loginOrOut = this.state.user.loggedIn ?
      <Link to="logout">Logout</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <nav>
        <div className='navwrapper'>
          <Link to="/" className="navwrapper__logo">Ninja Ocean</Link>
          <ul>
            <li>
              {loginOrOut}
            </li>
            <li><Link to="about">About</Link></li>
            <li><Link to="dashboard">Dashboard</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = NavigationBar;
