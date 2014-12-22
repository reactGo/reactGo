/** @jsx React.DOM */

var React = require('react');
var Paper = require('./Paper.react');
var cx = require('react/lib/cx');
var WindowListenable = require('../mixins/window-listenable');
var ReactPropTypes = React.PropTypes;
var ESC_KEYCODE = 27;

// Requiring component scss for left nav
require('../../scss/components/_mui-left-nav.scss');

var LeftNav = React.createClass({
	mixins: [WindowListenable],

	propTypes: {
		onChange: ReactPropTypes.func
	},

	windowListeners: {
		'keyup': '_onWindowKeyUp'
	},

	getDefaultProps: function() {
		return {
			docked: true
		};
	},

	getInitialState : function() {
		return {
			open : false
		};
	},

	toggle: function() {
		this.setState({ open: !this.state.open });
	},

	close: function() {
		this.setState({ 
			open: false 
		});
	},

	open: function() {
		this.setState({ 
			open: true 
		});
	},

	render : function() {
		
		var classes = cx({
				"mui-left-nav" : true,
				"mui-left-nav--closed": !this.state.open
				});
		
		return (
			<div className={classes}>
				<Paper
					className="mui-left-nav-menu"
					zDepth={2}
					rounded={false}
				>
				</Paper>
				<button onClick={this._onLeftNavButtonClick}>Toggle Menu</button>
			</div>
		);
	},

	_onLeftNavButtonClick: function(evt) {
   	 	this.toggle();
	},

	_onWindowKeyUp: function(evt) {
		if(evt.keyCode === ESC_KEYCODE &&
			this.state.open) {
			this.close();
		}
	}


});

module.exports = LeftNav;