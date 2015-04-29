var React = require('react');
var Link = require('react-router').Link;
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Navigation = React.createClass({
  getInitialState: function() {
    return {
      user: UserStore.getState().user
    };
  },

  componentDidMount: function() {
    UserStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    UserStore.unlisten(this.onChange);
  },

  onChange: function() {
    this.setState({
      user: UserStore.getState().user
    });
  },

  onLogout: function() {
    UserActions.logout();
  },

  render: function() {
    var loginOrOut = this.state.user.get('authenticated') ?
      <Link onClick={this.onLogout} className="navigation__item" to="logout">Logout</Link> :
      <Link className="navigation__item" to="login">Log in</Link>;
    return (
      <nav className="navigation" role="navigation">
          <Link to="/" className="navigation__item navigation__item--logo" activeClassName="navigation__item--active">Ninja Ocean</Link>
          { loginOrOut }
          <Link to="about" className="navigation__item" activeClassName="navigation__item--active">About</Link>
      </nav>
    );
  }
});

module.exports = Navigation;
