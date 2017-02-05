const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  /*
   * https://github.com/webpack/css-loader/issues/59 - use css-loader/locals on server-side rendering
   * :local(.className) used to declare className in the local scope,
   * local identifiers are exported by css-loader
   *
   * modules enable CSS Modules spec https://github.com/css-modules/css-modules
   *
   * importLoaders (int): That many loaders after the css-loader are applied to @import-ed resources.
   *
   */
  const queryModules = 'modules';
  const queryImportLoaders = 'importLoaders=1';
  const queryLocal = 'localIdentName=[name]__[local]___[hash:base64:5]';

  const queryStrExtractTextPlugin = '?' + queryModules + '&' + queryImportLoaders;
  const queryStr = queryStrExtractTextPlugin + '&' + queryLocal;

  const serverSide = 'css-loader/locals' + queryStr + '!postcss-loader';
  const browserSide = 'style-loader!css-loader' + queryStr + '!postcss-loader';

  const myLoader = browser ? browserSide : serverSide;

  const prodBrowserRenderLoader = ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader' + queryStrExtractTextPlugin + '!postcss-loader'
  });
  const loader = production && browser ? prodBrowserRenderLoader : myLoader;
  const obj = { test: /\.css$/, include: PATHS.app, loader };
  return obj;
};
