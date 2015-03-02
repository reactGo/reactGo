/**
 * Routes for express app
 */

var topics = require('../controllers/topics');
var users = require('../controllers/users');

module.exports = function(app, io, passport) {

  app.get('/', function(req, res) {
    //console.log(req.isAuthenticated);
    res.render('index', { user: req.user });
  });

  // user routes
  app.post('/login', users.postLogin);
  app.post('/signup', users.postSignUp);


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
