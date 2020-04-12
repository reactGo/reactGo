import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

import staticAssets from './static-assets';
import App from '../../app/pages/App';

const createApp = (req, store, context) => renderToString(
  <Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
);

const buildPage = ({ componentHTML, initialState, headAssets }) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript()}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
    ${staticAssets.createAppScript()}
    ${staticAssets.createVendorScript()}
  </body>
</html>`;
};

export default (req, store, context) => {
  const initialState = store.getState();
  console.log('initialState', initialState);
  let componentHTML;
  try {
    componentHTML = createApp(req, store, context);
  } catch (err) {
    console.error(err);
  }
  console.log('componentHTML', componentHTML);
  const headAssets = Helmet.renderStatic();
  return buildPage({ componentHTML, initialState, headAssets });
};
