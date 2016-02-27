var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
// Requiring sequelize creates a connection to postgres
var sequelize = require('./config/sequelize');
var passport = require('passport');
var secrets = require('./config/secrets');
var webpack = require('webpack');
var app = express();

// Find the appropriate database to connect to, default to localhost if not found.
var connect = function() {
  mongoose.connect(secrets.db.mongo, function(err, res) {
    if(err) {
      console.log('Error connecting to: ' + secrets.db.mongo + '. ' + err);
    }else {
      console.log('Succeeded connected to: ' + secrets.db.mongo);
    }
  });
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

var isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  var config = require('../webpack/webpack.config.dev-client.js');
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}


// Bootstrap passport config
require('./config/passport')(app, passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(app.get('port'));
