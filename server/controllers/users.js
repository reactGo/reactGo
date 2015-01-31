var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Show Login Form
 */
exports.login = function(req, res) {
    res.render('users/login', {
        title: 'Login'
    });
}
