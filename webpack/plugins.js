const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const PATHS = require('./paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      // create a common chunk in the vendor entry, and
      // put the webpackjsonp manifest in a common chunk
      // this makes sure that chunks hashes doesn't change too often
      new webpack.optimize.CommonsChunkPlugin({
          path: PATHS.assets,
          names: ['vendor', 'common'],
          filename: '[name].js',
          minChuncks: Infinity
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.BannerPlugin(bannerOptions),
      new webpack.optimize.UglifyJsPlugin({ compress })
    ];
  }
  if (production && browser) {
    return [
      new ManifestPlugin({
          fileName: 'app-manifest.json',
          stripSrc: true
      }),

      // create a common chunk in the vendor entry, and
      // put the webpackjsonp manifest in a common chunk
      // this makes sure that chunks hashes doesn't change too often
      new webpack.optimize.CommonsChunkPlugin({
          path: PATHS.assets,
          names: ['vendor', 'common'],
          filename: '[name].[chunkhash].chunk.js',
          minChuncks: Infinity
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new ExtractTextPlugin({
        filename: 'styles/main.css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({ compress })
    ];
  }
  return [];
};
