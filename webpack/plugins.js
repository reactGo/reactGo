const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };
  const compileTimeConstantForMinification = { __PRODUCTION__: JSON.stringify(production) };

  if (!production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.HotModuleReplacementPlugin(),
    ];
  }
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
    ];
  }
  if (production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV', 'REDUX_ASYNC_MIDDLEWARE']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
        allChunks: true,
      }),
      new ManifestPlugin({
        fileName: 'manifest.json',
        publicPath: ''
      })
    ];
  }
  return [];
};
