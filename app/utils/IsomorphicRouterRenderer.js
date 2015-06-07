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
import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

import routes from '../routes';

export default function IsomorphicRouterRenderer(alt) {
  if (typeof window === 'undefined') {
    return function(state, url) {
      // FIXME: Retaining variable markup outside of Handler function is bad.
      //        Should be a return value.
      let markup;
      Router.run(routes, url, function(Handler) {
        alt.bootstrap(state);
        let content = React.renderToString(React.createElement(Handler));
        markup = Iso.render(content, alt.flush());
      });
      return markup;
    };
  } else {
    Iso.bootstrap(function(state, _, container) {
      alt.bootstrap(state);
      Router.run(routes, Router.HistoryLocation, function(Handler) {
        let node = React.createElement(Handler);
        React.render(node, container);
      });
    });
  }
}
