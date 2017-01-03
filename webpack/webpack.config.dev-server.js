var path = require('path');
var webpack = require('webpack');

var commonConfig = require('./common.config');

var commonLoaders = commonConfig.commonLoaders;
var publicPath = commonConfig.output.publicPath;
var externals = commonConfig.externals;
var postCSSConfig = commonConfig.postCSSConfig;

module.exports = {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      server: '../server/index'
    },
    target: 'node',
    node: {
      __dirname: false
    },
    devtool: 'sourcemap',
    output: {
      // The output directory as absolute path
      path: path.join(__dirname, '..', 'compiled'),
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].dev.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders.concat({
        test: /\.css$/,
        loader: 'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      })
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    externals: externals,
    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.BannerPlugin(
          'require("source-map-support").install();',
          { raw: true, entryOnly: false }
        )
    ],
    postcss: postCSSConfig
};
