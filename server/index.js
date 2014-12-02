var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// Find the appropriate database to connect to, default to localhost if not found.
var uristring = process.env.MONGOHQ_URL ||
	process.env.MONGOLAB_URI ||
	'mongodb://localhost/ReactWebpackNode';

mongoose.connect(uristring, function(err, res) {
	if(err) {
		console.log('Error connecting to: ' + uristring + '. ' + err);
	}else {
		console.log('Succeeded connected to: ' + uristring);
	}
});

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, '..', 'public')));

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
	if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

require('./config/routes')(app);

app.listen(app.get('port'), function() {
	console.log('Node app is running at localhost:' + app.get('port'));
});