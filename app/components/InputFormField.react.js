/** @jsx React.DOM */

var React = require('react');

require('../../scss/components/_forms.scss');

// Todo: Have inline validators
var InputFormField = React.createClass({
    render: function() {
        return(
            <input placeholder={this.props.placeholder}/>
        );
    }
});

module.exports = InputFormField;