const path = require('path');

/*
 * __dirname is changed after webpack-ed to another directory
 * so process.cwd() is used instead to determine the correct base directory
 * Read more: https://nodejs.org/api/process.html#process_process_cwd
 */
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  app: path.resolve(CURRENT_WORKING_DIR, 'app'),
  assets: path.resolve(CURRENT_WORKING_DIR, 'public', 'assets'),
  compiled: path.resolve(CURRENT_WORKING_DIR, 'compiled'),
  public: '/assets/', // use absolute path for css-loader?
  prod_public: '/', // public path for production build should be like this
/*
 * In prod with public: '/assets/' the app tries to get the js and css from '/assets//assets/*' . Just changed the prod publicPath for '/'.
 */
  modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules')
};

