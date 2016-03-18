import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, createMemoryHistory } from 'react-router'
import axios from 'axios';
import { Provider } from 'react-redux';
import createRoutes from 'routes.jsx';
import configureStore from 'store/configureStore';
import headconfig from 'components/Meta';
import { fetchComponentDataBeforeRender } from 'api/fetchComponentDataBeforeRender';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

/*
 * Our html template file
 * @param {String} renderedContent
 * @param initial state of the store, so that the client can be hydrated with the same state as the server
 * @param head - optional arguments to be placed into the head
 */
function renderFullPage(renderedContent, initialState, head={
  title: 'React Webpack Node',
  meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
  link: '<link rel="stylesheet" href="/assets/styles/main.css"/>'
}) {
  return `
  <!doctype html>
    <html lang="">

    <head>
        ${head.title}

        ${head.meta}

        ${head.link}
    </head>
    <body>
    <div id="app">${renderedContent}</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    </body>
    </html>

  `;
}

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
    const history = createMemoryHistory();
    const authenticated = req.isAuthenticated();
    const store = configureStore({
      user: {
        authenticated,
        isWaiting: false,
        message: '',
        isLogin: true
      }
    }, history);

    const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(error, redirectLocation, renderProps)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - error: A javascript Error object if an error occured, `undefined` otherwise.
   * - redirectLocation: A `Location` object if the route is a redirect, `undefined` otherwise
   * - renderProps: The props you should pass to the routing context if the route matched, `undefined`
   *                otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const InitialView = (
        <Provider store={store}>
            <RouterContext {...renderProps} />
        </Provider>
      );

      // This method waits for all render component promises to resolve before returning to browser
      fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
      .then(() => {
        const componentHTML = renderToString(InitialView);
        const initialState = store.getState();
        res.status(200).end(renderFullPage(componentHTML, initialState, {
          title: headconfig.title,
          meta: headconfig.meta,
          link: headconfig.link
        }));
      })
      .catch(() => {
        res.end(renderFullPage('', {}));
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
}
