/*
	Requiring images. Webpack will copy these images into the correct directory to be used
	by the template.

	Note: I am still experimenting with including images with webpack. Was thinking of using html-loader,
	but it did not seem to fit in with the webpack + express setup we have.
 */
require('../images/apple-touch-icon-precomposed.png');
require('../images/chrome-touch-icon-192x192-precomposed.png');
require('../images/ms-touch-icon-144x144-precomposed.png');

module.exports = {};
