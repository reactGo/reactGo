import Iso from 'iso';
import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';

import alt from 'altInstance';
import routes from 'routes.jsx';
import html from 'base.html';

/*
 * @param {AltObject} an instance of the Alt object
 * @param {ReactObject} routes specified in react-router
 * @param {Object} Data to bootstrap our altStores with
 * @param {Object} req passed from Express/Koa server
 */
const renderToMarkup = (alt, state, req, res) => {
  let markup;
  let location = new Location(req.path, req.query);
  alt.bootstrap(state);
  Router.run(routes, location, (error, initialState, transition) => {
    if (transition.isCancelled) {
      return res.redirect(302, transition.redirectInfo.pathname);
    }
    let content = React.renderToString(<Router {...initialState} />);
    markup = Iso.render(content, alt.flush());
  });

  return markup;
};

/* 
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(state, req, res) {
  const markup = renderToMarkup(alt, state, req, res);
  return html.replace('CONTENT', markup);
};
