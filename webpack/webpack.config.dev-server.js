var path = require('path');
var webpack = require('webpack');
var commonLoaders = require('./common.config').commonLoaders;
var assetsPath = require('./common.config').assetsPath;
var publicPath = require('./common.config').publicPath;

module.exports = {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      server: './server'
    },
    target: 'node',
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: 'server.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders.concat([
           {
              test: /\.css$/,
              loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
           }
      ])
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    plugins: [
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: true
        }),
        new webpack.IgnorePlugin(/vertx/)
    ]
};
