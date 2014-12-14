/**
 * Routes for express app
 */

 var topics = require('../controllers/topics');

 module.exports = function(app, io, passport) {
 	// topic routes
 	app.get('/topic', topics.all);
 	app.post('/topic', function(req, res) {
 		topics.add(req, res);
 		// Emitting an event so clients will update themselves
 		io.sockets.emit('topic change');
 	});
 	app.put('/topic', function(req, res) {
 		topics.update(req, res);
 		io.sockets.emit('topic change');
 	});
 	app.delete('/topic', function(req, res) {
 		topics.remove(req, res);
 		io.sockets.emit('topic change');
 	});

 	// Adding this in as an example
 	io.on('connection', function(socket) {
 		socket.emit('news', { hello: 'world'});
 		socket.on('my other event', function(data) {
 			console.log(data);
 		});
 	});
 };