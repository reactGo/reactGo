const PATHS = require('../paths');

module.exports = ({ production = false, browser = false } = {}) => {
  const obj = {
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'react', 'stage-0']
    },
    exclude: PATHS.modules
  };
  if (production) {
    obj.query.plugins = [
      'transform-react-remove-prop-types',
      'transform-react-constant-elements',
      'transform-react-inline-elements'
    ];
  } else if (browser) {
    obj.query.presets.unshift('react-hmre');
  }
  return obj;
};

