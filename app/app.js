var React = require('react');
var IsomorphicRouterRenderer = require('./utils/IsomorphicRouterRenderer');
var alt = require('./alt');
var routes = require('./routes');

module.exports = IsomorphicRouterRenderer(alt, routes);
