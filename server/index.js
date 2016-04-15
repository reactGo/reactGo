const express = require('express');
const webpack = require('webpack');
const path = require('path');
const appConfig = require('./config/appConfig');
const dbConfig = require('./db');
const app = express();
const compiledAppModulePath = path.resolve(__dirname, '..', 'public', 'assets', 'server.js');
const App = require(compiledAppModulePath);

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
dbConfig.connect();

/*
 * REMOVE if you do not need passport configuration
 */
require('./config/passport')();

if (appConfig.ENV === 'development') {
  const config = require('../webpack/webpack.config.dev-client.js');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */
require('./config/express')(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
require('./config/routes')(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App.default);

app.listen(app.get('port'));
