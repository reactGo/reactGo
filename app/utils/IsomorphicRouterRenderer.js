'use strict'
/**
 * This is a modified version of https://github.com/goatslacker/alt/blob/master/utils/IsomorphicRenderer.js
 * IsomorphicRenderer(alt: AltInstance, App: ReactElement): mixed
 * Will work with webpack
 *
 * > The glue that it takes to render a react element isomorphically
 *
 * ** This util depends on iso and react **
 *
 * Usage:
 *
 * ```js
 * var IsomorphicRenderer = require('alt/utils/IsomorphicRenderer');
 * var React = require('react');
 * var Alt = require('alt');
 * var alt = new Alt();
 *
 * var App = React.createClass({
 *   render() {
 *     return (
 *       <div>Hello World</div>
 *     );
 *   }
 * });
 *
 * module.exports = IsomorphicRenderer(alt, App);
 * ```
 */
module.exports = IsomorphicRouterRenderer;

var Iso = require('iso');
var React = require('react');
var Router = require('react-router');
var routes = require('../routes');

function IsomorphicRouterRenderer(alt, App) {
  if (typeof window === 'undefined') {
    return function (state, url) {
      var markup;
      Router.run(routes, url, function (Handler) {
        alt.bootstrap(state);
        var content = React.renderToString(React.createElement(Handler));
        markup = Iso.render(content, alt.takeSnapshot());
        alt.flush();
        
      });
      return markup;
    }
  } else {
    Iso.bootstrap(function (state, _, container) {
      alt.bootstrap(state);
      Router.run(routes, Router.HistoryLocation, function (Handler) {
        var node = React.createElement(Handler)
        React.render(node, container)
      });
    })
  }
}
