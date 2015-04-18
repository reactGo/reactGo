var React = require('react');
var Link = require('react-router').Link;
// var Link = Router.Link;
// var Navigation = Router.Navigation;
// var UserStore = require('../stores/UserStore');

var Navigation = React.createClass({
  // mixins: [Navigation],

  // getInitialState: function() {
  //   return {
  //     user: UserStore.getUserData()
  //   };
  // },

  // componentDidMount: function() {
  //   UserStore.addChangeListener(this._onUserChange);
  // },

  // componentWillUnmount: function() {
  //   UserStore.removeChangeListener(this._onUserChange);
  // },

  // _onUserChange: function() {
  //   this.setState({
  //     user: UserStore.getUserData()
  //   });
  //   // if loggedIn, transition to '/'
  //   // This might need to be moved to an outer router
  //   if(this.state.user.loggedIn) {
  //     this.transitionTo('/');
  //   }
  // },


  render: function() {
    // var loginOrOut = this.state.user.loggedIn ?
    //   <Link to="logout">Logout</Link> :
    //   <Link to="login">Sign in</Link>;
    return (
      <nav className="navigation" role="navigation">
          <Link to="/" className="navigation__item navigation__item--logo" activeClassName="navigation__item--active">Ninja Ocean</Link>
          <Link to="about" className="navigation__item" activeClassName="navigation__item--active">About</Link>
      </nav>
    );
  }
});

module.exports = Navigation;
