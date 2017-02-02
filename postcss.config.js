/*
 * postcss.config.js
 *
 * use by webpack to configure postcss-loader
 * see usage in https://github.com/postcss/postcss-loader
 *
 */
const path = require('path');
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

module.exports = {
  plugins: [
    postcssImport({ path: path.resolve(process.cwd(), './app/css') }),
    postcssCssnext({ browsers: ['> 1%', 'last 2 versions'] }),
    postcssReporter({ clearMessages: true })
  ]
};
