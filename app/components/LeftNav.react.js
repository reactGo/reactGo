/** @jsx React.DOM */

var React = require('react');
var cx = require('react/lib/cx');
var WindowListenable = require('../mixins/window-listenable');
var ReactPropTypes = React.PropTypes;
var ESC_KEYCODE = 27;
require('../../scss/components/_mui-left-nav.scss');

var LeftNav = React.createClass({
	mixins: [WindowListenable],

	propTypes: {
		docked: ReactPropTypes.bool,
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
			open : this.props.docked
		};
	},

	toggle: function() {
		this.setState({ open: !this.state.open });
		return this;
	},

	close: function() {
		this.setState({ open: false });
		return this;
	},

	open: function() {
		this.setState({ open: true });
		return this;
	},

	
	render : function() {
		return (
			<div className={cx({
				'mui-left-nav' : true,
				'mui-left-nav--closed': !this.state.open,
				'mui-left-nav--shown' : this.state.open
				})}>
				<button onClick={this._onTopNavButtonClick}>Menu button</button>
			</div>
		);
	},

	_onTopNavButtonClick: function(evt) {
		if(!this.props.docked) this.close();
   	 	this.toggle();
	},

	_onWindowKeyUp: function(evt) {
		if(e.keyCode === ESC_KEYCODE && 
			!this.props.docked && 
			this.state.open) {
			this.close();
		}
	}


});

module.exports = LeftNav;