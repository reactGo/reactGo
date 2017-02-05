const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (production = false, browser = false) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.IgnorePlugin(/vertx/),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.EnvironmentPlugin(['NODE_ENV'])
    ];
  }
  if (production && !browser) {
    return [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.IgnorePlugin(/vertx/),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (production && browser) {
    const filename = 'styles/main.css';
    const allChunks = true;

    return [
      new ExtractTextPlugin({ filename, allChunks }), // extracted css to css/main.css
      // new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new webpack.EnvironmentPlugin(['NODE_ENV'])
    ];
  }
  return [];
};
