var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var passport = require('passport');
var secrets = require('./config/secrets');


// Find the appropriate database to connect to, default to localhost if not found.
var connect = function() {
	mongoose.connect(secrets.db, function(err, res) {
		if(err) {
			console.log('Error connecting to: ' + secrets.db + '. ' + err);
		}else {
			console.log('Succeeded connected to: ' + secrets.db);
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

// Bootstrap passport config
require('./config/passport')(app, passport);

// Bootstrap application settings
require('./config/express')(app, passport);
// Bootstrap routes
require('./config/routes')(app, io, passport);

server.listen(app.get('port'));