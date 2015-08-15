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
import Location from 'react-router/lib/Location';
import routes from 'routes.jsx';

/*
 * @param {AltObject} an instance of the Alt object
 * @param {ReactObject} routes specified in react-router
 * @param {Object} Data to bootstrap our altStores with
 * @param {Object} req passed from Express/Koa server
 */
const renderToMarkup = (alt, state, req) => {
  let markup;
  let location = new Location(req.path, req.query);
  Router.run(routes, location, (error, initialState, transition) => {
    alt.bootstrap(state);
    let content = React.renderToString(<Router {...initialState} />);
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
export default function UniversalRenderer(alt, html) {
  let render;
  // if it is not a browser
  if (typeof window === 'undefined') {
    // if there is a html string passed in
    // render the markup and inject it into the html string
    if (html) {
      render = (state, req) => {
        const markup = renderToMarkup(alt, state, req);
        return html.replace('CONTENT', markup);
      };
    } else {
      render = (state, req) => {
        return renderToMarkup(alt, state, req);
      };
    }
  } else {
    render = Iso.bootstrap((state, _, container) => {
      alt.bootstrap(state);
      React.render(<Router children={routes} />, container);
    });
  }

  return render;
}
