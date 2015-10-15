import Iso from 'iso';
import React from 'react';
import { RoutingContext, match } from 'react-router'
import createLocation from 'history/lib/createLocation';
import { Provider } from 'react-redux';
import routes from 'routes.jsx';
import html from 'base.html';
import configureStore from 'redux/store/configureStore'

/*
 * @param {AltObject} an instance of the Alt object
 * @param {ReactObject} routes specified in react-router
 * @param {Object} Data to bootstrap our altStores with
 * @param {Object} req passed from Express/Koa server
 */
const renderToMarkup = (store, req, res) => {
  let markup, content;
  let location = new createLocation(req.url);

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation)
      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    else if (error)
      res.send(500, error.message)
    else if (renderProps == null)
      res.send(404, 'Not found')
    else
      content = React.renderToString(
        <Provider store={store}>
          { () => <RoutingContext {...renderProps} /> }
        </Provider> );
      markup = Iso.render(content, store.getState());
  });

  return markup;
};

/* 
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(state, req, res) {
  let store = configureStore(state);
  const markup = renderToMarkup(store, req, res);
  return html.replace('CONTENT', markup);
};
