/**
 * Routes for express app
 */

 var topics = require('../controllers/topics');

 module.exports = function(app, passport) {
 	// topic routes
 	app.get('/topic', topics.all);
 	app.post('/topic', topics.add);
 	app.put('/topic', topics.update);
 	app.delete('/topic', topics.remove)
 };