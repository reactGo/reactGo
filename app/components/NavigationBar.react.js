/** jsx@React.DOM */
var React = require('react');

// First attempt at inlining styles


//requiring nav styles
require('../../scss/components/_navbar.scss');

var NavigationBar = React.createClass({
    render: function() {
        return (
            <nav>
                <div className='div-navwrapper'>
                    <a href='#' className='div-navwrapper__logo'>Ninja Ocean</a>
                    <ul>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = NavigationBar;
