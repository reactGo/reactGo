var React = require('react');
var IsomorphicRouterRenderer = require('./utils/IsomorphicRouterRenderer');
var alt = require('./alt');
var routes = require('./routes');

var css = require('!css!sass!./scss/main.scss');

module.exports = IsomorphicRouterRenderer(alt, routes);
