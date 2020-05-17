import React from 'react';
import { renderToString } from 'react-dom/server';
import { useStaticRendering } from 'mobx-react';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';

import staticAssets from './static-assets';
import App from '../../app/pages/App';
import StoreProvider from '../../app/Context';
import { ENV } from '../../config/env';

if (ENV === 'development') {
  useStaticRendering(true);
}
const createApp = (req, context) => renderToString(
  <StoreProvider>
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  </StoreProvider>
);

const buildPage = ({ componentHTML, store, headAssets }) => {
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
    <script>window.__INITIAL_STATE__ = ${serialize(store)}</script>
    ${staticAssets.createAppScript()}
    ${staticAssets.createVendorScript()}
  </body>
</html>`;
};

export default (req, store, context) => {
  let componentHTML;
  try {
    componentHTML = createApp(req, context);
  } catch (err) {
    console.error(err);
  }
  const headAssets = Helmet.renderStatic();
  return buildPage({ componentHTML, store, headAssets });
};
