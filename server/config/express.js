var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app) {
	app.set('port', (process.env.PORT || 3000));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	app.use(express.static(path.join(__dirname, '../..', 'public')));
};
