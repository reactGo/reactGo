/** @jsx React.DOM */

var React = require('react');
var InputFormField = require('../InputFormField.react');

var LoginApp = React.createClass({
    render: function() {
        return (
            <div className="div-login">
                <InputFormField type="email"/>
                <InputFormField type="password"/>
            </div>
        );
    }
});

module.exports = LoginApp;