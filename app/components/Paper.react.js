/** @jsx React.DOM */

/* Modified from https://github.com/callemall/material-ui */
/* For more information about Paper, check out this http://material-ui.com/#/components/paper */
/* Modifications by Ken: 
 	- Using cx instead of the Classible mixin.
	- Remove use of Destructuring Assignment because not many browsers support it yet. 
	(I still like it though, perhaps I will opt for a polyfill)
	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 */
var React = require('react');
var cx = require('react/lib/cx');
var ReactPropTypes = React.PropTypes;

// Requiring the scss file for Paper within the module
require('../../scss/components/_paper.scss');
var Paper = React.createClass({

	/*
	 * circle: True if we want to generate a circular container
	 * innerClassName: The paper container consists of 2 nested divs. 
	 *	It's sometimes helpful to assign an className to the inner div for styling. 
	 *	This property is the className for the inner div.
	 * rounded: By default, the paper container will have a border radius. Set this to false for sharp corners.
	 * zDepth: This number represents the depth of the paper shadow.
	 */
	propTypes: {
		circle: ReactPropTypes.bool,
		innerClassName: ReactPropTypes.string,
		rounded: ReactPropTypes.bool,
		zDepth: ReactPropTypes.oneOf([0,1,2,3,4,5])
	},

	getDefaultProps: function() {
		return {
			innerClassName: '',
			rounded: true,
			zDepth: 1
		};
	},

	render: function() {
		var circle = this.props.circle,
			innerClassName = this.props.innerClassName,
			rounded = this.props.rounded,
			zDepth = this.props.zDepth,
			className = this.props.className,
			classes = cx({
				'mui-paper': true,
				'mui-paper--rounded': rounded,
				'mui-paper--circle' : circle
			}),
			insideClasses = cx({
				'mui-paper-container' : true,
				'mui-z-depth-bottom' : true
			});

			// Adding z-depth to the classes
			//'mui-paper--z-depth-' + zDepth,
			classes = cx(className, classes, 'mui-paper--z-depth-' + zDepth);
		return (
			<div className={classes}>
				<div ref="innerContainer" className={insideClasses}>
					{this.props.children}
				</div>
			</div>
		);
	},

	getInnerContainer: function() {
		return this.refs.innerContainer;
	}

});

module.exports = Paper;