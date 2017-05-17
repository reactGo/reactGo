const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const presets = [['es2015', { modules: false }], 'react', 'stage-0'];
  const plugins = production ? [
      'transform-react-remove-prop-types',
      'transform-react-constant-elements',
      'transform-react-inline-elements'
  ] : [];

  if (!production && browser) {
    plugins.push('react-hot-loader/babel');
  }

  return {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    options: {
      presets,
      plugins
    },
    exclude: PATHS.modules
  };
};

