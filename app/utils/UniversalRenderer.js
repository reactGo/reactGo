/**
 * UniversalRenderer was inspired by https://github.com/goatslacker/alt/blob/master/utils/IsomorphicRenderer.js
 *
 * Will work with webpack
 *
 * > The glue that it takes to render a react element isomorphically
 *
 * ** This util depends on iso and React **
 *
 * Usage:
 *
 * ```js
 * import universalRenderer from './utils/UniversalRenderer';
 * import alt from './alt';
 * import routes from './routes';
 * import html from './base.html';
 *
 * export default universalRenderer(alt, routes, html);
 * ```
 *
 * Note: If you do not pass in a html template, UniversalRenderer will render only the ReactElements
 *       for you.
 */
import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

/*
 * @param {AltObject} an instance of the Alt object
 * @param {ReactObject} routes specified in react-router
 * @param {Object} Data to bootstrap our altStores with
 * @param {String} url that react-router should route to
 */
const renderToMarkup = (alt, routes, state, url) => {
  let markup;

  Router.run(routes, url, (Handler) => {
    alt.bootstrap(state);
    let content = React.renderToString(React.createElement(Handler));
    markup = Iso.render(content, alt.flush());
  });
  return markup;
};

/*
 * @param {AltObject} an instance of the Alt object
 * @param {ReactObject} routes specified in react-router
 * @param {String} HTML template passed in
 * @return render function which can be executed on server/client side
 */
export default function UniversalRenderer(alt, routes, html) {
  let render;
  // if it is not a browser
  if (typeof window === 'undefined') {
    // if there is a html string passed in
    // render the markup and inject it into the html string
    if (html) {
      render = (state, url) => {
        const markup = renderToMarkup(alt, routes, state, url);
        return html.replace('CONTENT', markup);
      };
    } else {
      render = (state, url) => {
        return renderToMarkup(alt, routes, state, url);
      };
    }
  } else {
    render = Iso.bootstrap((state, _, container) => {
      alt.bootstrap(state);
      Router.run(routes, Router.HistoryLocation, (Handler) => {
        let node = React.createElement(Handler);
        React.render(node, container);
      });
    });
  }

  return render;
}
