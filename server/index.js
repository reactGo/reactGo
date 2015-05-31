var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var passport = require('passport');
var secrets = require('./config/secrets');
var sequelize = require('./config/sequelize');

// Find the appropriate database to connect to, default to localhost if not found.
var mongoConnect = function() {
  // Connecting to MongoDB
  mongoose.connect(secrets.db.mongo, function(err, res) {
    if(err) {
      console.log('Error connecting to: ' + secrets.db.mongo + '. ' + err);
    }else {
      console.log('Succeeded connected to: ' + secrets.db.mongo);
    }
  });
};
mongoConnect();
// Requiring sequelize also creates a connection to postgres

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', mongoConnect);



// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  // Not all of the models require sequelize
  // Currently still leaving mongoose models and postgresql models within the same folder
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// Bootstrap passport config
require('./config/passport')(app, passport);

// Bootstrap application settings
require('./config/express')(app, passport);
// Bootstrap routes
require('./config/routes')(app, io, passport);

server.listen(app.get('port'));