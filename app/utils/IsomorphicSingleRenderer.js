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

export default function IsomorphicSingleRenderer(alt, App) {
  if (typeof window === 'undefined') {
    return function (state) {
      alt.bootstrap(state);
      let app = React.renderToString(React.createElement(App));
      let markup = Iso.render(app, alt.takeSnapshot());
      alt.flush();
      return markup;
    };
  } else {
    Iso.bootstrap(function (state, _, node) {
      let app = React.createElement(App);
      alt.bootstrap(state);
      React.render(app, node);
    });
  }
}
