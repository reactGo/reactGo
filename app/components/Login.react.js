/** @jsx React.DOM */

var React = require('react');
var InputFormField = require('./InputFormField.react');
var UserActionCreators = require('../actions/UserActionCreators');

// require('../../scss/components/_login.scss');

var Login = React.createClass({

  _loginSubmit: function(evt) {
    // TODO: Add validation
    var email, pswd;
    email = this.refs.emailForm.getDOMNode().value;
    pswd = this.refs.passwordForm.getDOMNode().value;
    UserActionCreators.submitLoginCredentials({
      email: email,
      password: pswd
    });
  },

  /**
   * Keeping this function here for reference purposes. Will refactor this later to work with registering
   * @param evt
   * @private
   */
  _registerSubmit: function(evt) {
    var email, pswd;
    email = this.refs.emailForm.getDOMNode().value;
    pswd = this.refs.passwordForm.getDOMNode().value;
    cpswd = this.refs.passwordConfirmForm.getDOMNode().value;
    UserActionCreators.submitSignUpCredentials({
      email: email,
      password: pswd
    });
  },

  render: function() {
    return (
      <div>
        <div>
          <h1>Login to unlock awesome</h1>
          <fieldset>
            <InputFormField type="email" placeholder="Email" ref="emailForm"/>
            <InputFormField type="password" placeholder="Password" ref="passwordForm"/>
            <button className="mui-button__login" onClick={this._loginSubmit}>Login</button>
          </fieldset>
          <p>Hint: username &amp; password: ken</p>
        </div>
      </div>
    );
  }
});

module.exports = Login;