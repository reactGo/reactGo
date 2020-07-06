import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Helmet, HelmetData } from 'react-helmet';
import { Store } from 'redux';
import serialize from 'serialize-javascript';
import { Request } from 'express';

import staticAssets from './static-assets';
import App from '../../app/pages/App';

const createApp = (req: Request, store: Store, context: { url?: string }) => renderToString(
  <Provider store={store}>
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
);

const buildPage = ({ componentHTML, initialState, headAssets }: { componentHTML?: string, initialState: object, headAssets: HelmetData }) => {
  return `
<!doctype html>
<html ${headAssets.htmlAttributes.toString()}>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${staticAssets.createStylesheets()}
    ${staticAssets.createTrackingScript()}
  </head>
  <body ${headAssets.bodyAttributes.toString()}>
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${serialize(initialState)}</script>
    ${staticAssets.createAppScript()}
    ${staticAssets.createVendorScript()}
  </body>
</html>`;
};

export default (req: Request, store: Store, context: { url?: string }) => {
  const initialState = store.getState();
  let componentHTML;
  try {
    componentHTML = createApp(req, store, context);
  } catch (err) {
    console.error(err);
  }
  const headAssets = Helmet.renderStatic();
  return buildPage({ componentHTML, initialState, headAssets });
};
