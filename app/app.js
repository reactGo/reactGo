var isomorphicRouterRenderer = require('./utils/IsomorphicRouterRenderer');
var alt = require('./alt');
var routes = require('./routes');

module.exports = isomorphicRouterRenderer(alt, routes);
