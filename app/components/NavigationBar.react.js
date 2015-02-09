/** jsx@React.DOM */
var React = require('react');
var UserActionCreators = require('../actions/UserActionCreators');

// Experimenting with inline styles
var buttonStyle = {
    color: '#fff',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
    fontFamily: 'Roboto Condensed'
};

//requiring nav styles
require('../../scss/components/_navbar.scss');

var NavigationBar = React.createClass({
    render: function() {
      var userBtn;
      if(this.props.isLoggedIn) {
        userBtn =   <span style={buttonStyle}>{this.props.email}</span>;
      }else {
        userBtn =   <span style={buttonStyle} onClick={this._toggleModal}>Login | Register</span>;
      }
      return (
          <nav>
              <div className='div-navwrapper'>
                  <a href='#' className='div-navwrapper__logo'>Ninja Ocean</a>
                  <ul>
                      <li>
                        {userBtn}
                      </li>
                  </ul>
              </div>
          </nav>
      );
    },

    _toggleModal: function(evt) {
        UserActionCreators.toggleModal();
    }
});

module.exports = NavigationBar;
