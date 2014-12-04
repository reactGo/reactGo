var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var app = express();

// Find the appropriate database to connect to, default to localhost if not found.
var uristring = process.env.MONGOHQ_URL ||
	process.env.MONGOLAB_URI ||
	'mongodb://localhost/ReactWebpackNode';

var connect = function() {
	mongoose.connect(uristring, function(err, res) {
		if(err) {
			console.log('Error connecting to: ' + uristring + '. ' + err);
		}else {
			console.log('Succeeded connected to: ' + uristring);
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

// Bootstrap application settings
require('./config/express')(app);
// Bootstrap routes
require('./config/routes')(app);

app.listen(app.get('port'), function() {
	console.log('Node app is running at localhost:' + app.get('port'));
});