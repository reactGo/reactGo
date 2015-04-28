var React = require('react');

const createSpanElementWithTransition = (letter, i) => {
	return React.createElement('span', {
		style: {
			WebkitTransition: 'opacity 0.25s ease ' + (i * 0.05) + 's'
		},
		key: i
	}, letter);
};

module.exports = {
	createTextTransition: text => text.split('').map(createSpanElementWithTransition)
};
