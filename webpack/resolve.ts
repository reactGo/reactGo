import PATHS from './paths';

export default {
  modules: [PATHS.app, PATHS.modules],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
  alias: {
    'react-dom': '@hot-loader/react-dom'
  },
};
