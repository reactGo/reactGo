/** jsx@React.DOM */
var React = require('react');

// First attempt at inling styles
var navStyle = {
    color: '#fff',
    backgroundColor: '#ee6e73',
    width: '100%',
    height: 56,
    lineHeight: 56,
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'
};



var NavigationBar = React.createClass({
    render: function() {
        return (
            <nav style={navStyle}>
                <div>
                </div>
            </nav>
        );
    }
});

module.exports = NavigationBar;
