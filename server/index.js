var express = require('express');
var passport = require('passport');
var webpack = require('webpack');
var path = require('path');
var appConfig = require('./config/appConfig');
var app = express();
var compiled_app_module_path = path.resolve(__dirname, '..', 'public', 'assets', 'server.js');
var App = require(compiled_app_module_path);

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
require('./config/connect')[appConfig.DB_TYPE]();

/*
 * REMOVE if you do not need passport configuration
 */
require('./config/passport')(app);

if (appConfig.ENV === 'development') {
  var config = require('../webpack/webpack.config.dev-client.js');
  var compiler = webpack(config);
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
 * App is a function that requires store data and url to initialize and return the React-rendered html string
 */
app.get('*', function (req, res, next) {
  App.default(req, res);
});

app.listen(app.get('port'));
