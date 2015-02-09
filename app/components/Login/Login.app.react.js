/** @jsx React.DOM */

var React = require('react');
var cx = require('react/lib/cx');
var InputFormField = require('../InputFormField.react');
var UserActionCreators = require('../../actions/UserActionCreators');

require('../../../scss/components/_login.scss');

var LoginApp = React.createClass({

    _toggleRegister: function(evt) {
      this.setState({
        showLogin: !this.state.showLogin
      });
    },

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

    getInitialState: function() {
      return {
        showLogin: true
      };
    },

    render: function() {
        var form, toggleText;
        if(this.state.showLogin) {
          form = <fieldset>
                        <InputFormField type="email" placeholder="Email" ref="emailForm"/>
                        <InputFormField type="password" placeholder="Password" ref="passwordForm"/>
                        <button className="mui-button__login" onClick={this._loginSubmit}>Login</button>
                </fieldset>;
          toggleText = 'I do not have a ninja account';
        } else {
          form = <fieldset>
                        <InputFormField type="email" placeholder="Email" ref="emailForm"/>
                        <InputFormField type="password" placeholder="Password" ref="passwordForm"/>
                        <InputFormField type="password" placeholder="Confirm Password" ref="passwordConfirmForm"/>
                        <button className="mui-button__login" onClick={this._registerSubmit}>Register</button>
                </fieldset>;
          toggleText = 'I already have an ninja account, log me in!'
        }

        return (
            <div className={
                cx({
                    'div-modal__overlay' : this.props.modal
                })
                }>
                <div className={
                    cx({
                      'div-modal__content--show': this.props.modal,
                      'div-modal__content--hide': !this.props.modal
                    })}>
                    <h1>Login to unlock awesome</h1>
                  {form}
                    <div className="div-modal__logintoggle" onClick={this._toggleRegister}>{toggleText}</div>
                </div>
            </div>
        );
    }
});

module.exports = LoginApp;