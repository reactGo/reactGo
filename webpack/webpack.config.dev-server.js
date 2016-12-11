var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var commonLoaders = require('./common.config').commonLoaders;
var publicPath = require('./common.config').publicPath;

var nodeModules = fs.readdirSync('node_modules')
                    .filter(function(x) {
                      return ['.bit'].indexOf(x) === -1;
                    })
                    .reduce(function(acc, cur) {
                      acc[cur] = 'commonjs ' + cur;
                      return acc;
                    }, {});

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
        loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      })
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css'],
    },
    externals: nodeModules,
    plugins: [
        new webpack.DefinePlugin({
          __DEVCLIENT__: false,
          __DEVSERVER__: true
        }),
        new webpack.IgnorePlugin(/vertx/)
    ]
};
