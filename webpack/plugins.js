const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

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
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new ExtractTextPlugin({
        filename: 'styles/main.css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new ManifestPlugin({
        fileName: 'manifest.json'
      })
    ];
  }
  return [];
};
