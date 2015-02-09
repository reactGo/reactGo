/** @jsx React.DOM */

var React = require('react');

require('../../scss/components/_forms.scss');

// Todo: Have inline validators
var InputFormField = React.createClass({
    render: function() {
        return(
            <input type={this.props.type} placeholder={this.props.placeholder} ref={this.props.ref}/>
        );
    }
});

module.exports = InputFormField;