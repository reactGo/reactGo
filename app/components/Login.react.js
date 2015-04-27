var React = require('react');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var Login = React.createClass({

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

  loginSubmit: function(evt) {
    var email, pswd;
    email = this.refs.email.getDOMNode().value;
    pswd = this.refs.password.getDOMNode().value;
    UserActions.login({
      email: email,
      password: pswd
    });
  },

  // *
  //  * Keeping this function here for reference purposes. Will refactor this later to work with registering
  //  * @param evt
  //  * @private
   
  // _registerSubmit: function(evt) {
  //   var email, pswd;
  //   email = this.refs.emailForm.getDOMNode().value;
  //   pswd = this.refs.passwordForm.getDOMNode().value;
  //   cpswd = this.refs.passwordConfirmForm.getDOMNode().value;
  //   UserActionCreators.submitSignUpCredentials({
  //     email: email,
  //     password: pswd
  //   });
  // },

  render: function() {
    if(this.state.user.get('authenticated')) {
      return (
        <div className="login">
          <h1 className="login__header">You are logged in amigo</h1>
        </div>
      );
    } else {
      if(this.state.user.get('isWaiting')) {
        return (
          <div className="login">
            <h1 className="login__header">Waiting ...</h1>
          </div>
        );
      } else {
        return (
          <div className="login">
            <h1 className="login__header">Login Demo</h1>
            <fieldset className="login__fieldset">
              <input className="login__input" type="email" ref="email" placeholder="email" />
              <input className="login__input" type="password" ref="password" placeholder="password" />
              <button className="login__button login__button--green" onClick={this.loginSubmit}>Login</button>
              <p className="login__hint">Hint: email: example@ninja.com password: ninja</p>
            </fieldset>
           </div>
        );
      }
      
    }
  }
});

module.exports = Login;