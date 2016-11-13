var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  publicPath: '/assets/',
  assetsPath: path.join(__dirname, '..', 'public', 'assets'),
  commonLoaders: [
    {
      /*
       * TC39 categorises proposals for babel in 4 stages
       * Read more http://babeljs.io/docs/usage/experimental/
       */
      test: /\.js$|\.jsx$/,
      loader: 'babel-loader',
      // Reason why we put this here instead of babelrc
      // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: [
          'transform-decorators-legacy',
          'transform-react-remove-prop-types',
          'transform-react-constant-elements',
          'transform-react-inline-elements'
        ]
      },
      include: path.join(__dirname, '..', 'app'),
      exclude: path.join(__dirname, '..', 'node_modules')
    },
    { test: /\.json$/, loader: 'json-loader' },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url',
      query: {
        name: '[hash].[ext]',
        limit: 10000,
      }
    }
  ]
};
