import React from 'react';
import staticAssets from './static-assets';

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
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${staticAssets.createAppScript()}
  </body>
</html>`;
};

export default ({ componentHTML, initialState, headAssets }) => {
  return buildPage({ componentHTML, initialState, headAssets });
};
