var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var swig = require('swig');

module.exports = function(app) {
	app.set('port', (process.env.PORT || 3000));

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '..', 'views'));

    // Swig will cache templates for you, but you can disable
    // that and use Express's caching instead, if you like:
    app.set('view cache', false);
    // To disable Swig's cache, do the following:
    swig.setDefaults({ cache: false });
    // NOTE: You should always cache templates in a production environment.
    // Don't leave both of these to `false` in production!

    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
	app.use(express.static(path.join(__dirname, '../..', 'public')));
};
