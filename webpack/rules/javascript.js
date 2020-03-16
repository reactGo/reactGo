const PATHS = require('../paths');

module.exports = ({ production = false } = {}) => {
  const presets = ['@babel/preset-env', '@babel/preset-react'];

  const plugins = production ? [
    'react-hot-loader/babel',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-proposal-class-properties',
  ] : [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties'
  ];

  return {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    options: {
      presets,
      plugins,
    },
    exclude: PATHS.modules,
  };
};

