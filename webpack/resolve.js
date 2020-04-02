const PATHS = require('./paths');

module.exports = {
  modules: [PATHS.app, PATHS.modules],
  extensions: ['.js', '.jsx', '.css'],
  alias: {
    'react-dom': '@hot-loader/react-dom'
  },
};
