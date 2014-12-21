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

	componentWillUpdate: function(nextProps, nextState) {
		console.log(JSON.stringify(nextProps));
		console.log(JSON.stringify(nextState));
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
				<button onClick={this._onLeftNavButtonClick}>Click</button>
			</div>
		);
	},

	_onLeftNavButtonClick: function(evt) {
		console.log('I have been clicked');
   	 	this.toggle();

	},

	// _onWindowKeyUp: function(evt) {
	// 	if(e.keyCode === ESC_KEYCODE && 
	// 		this.state.open) {
	// 		this.close();
	// 	}
	// }


});

module.exports = LeftNav;