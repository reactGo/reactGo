import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import { trackingID } from '../config/app';

/*
 * Consider async script loading if you support IE9+
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/
 */
const createTrackingScript = trackingID =>
`<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', ${trackingID}, 'auto');
  ga('send', 'pageview');
  </script>`;

const analyticsScript = createTrackingScript(trackingID);

const createApp = (store, props) => renderToString(
  <Provider store={store}>
    <RouterContext {...props} />
  </Provider>
);

const createScriptTags = () => {
  return `${analyticsScript}<script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>`;
};

const buildPage = ({ componentHTML, initialState, headAssets, analyticsScript }) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${createScriptTags()}
  </body>
</html>`;
};

export default (store, props) => {
  const initialState = store.getState();
  const componentHTML = createApp(store, props);
  const headAssets = Helmet.rewind();
  return buildPage({ componentHTML, initialState, headAssets, analyticsScript });
};

