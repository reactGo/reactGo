/** @jsx React.DOM */

var React = require('react');
var cx = require('react/lib/cx');
var InputFormField = require('../InputFormField.react');


require('../../../scss/components/_login.scss');

var LoginApp = React.createClass({
    render: function() {
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
                    <fieldset>
                        <InputFormField type="email" placeholder="Email"/>
                        <InputFormField type="password" placeholder="Password"/>
                        <button className="mui-button__login">Login</button>
                    </fieldset>
                </div>
            </div>
        );
    }
});

module.exports = LoginApp;