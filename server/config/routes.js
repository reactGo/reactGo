/**
 * Routes for express app
 */
var topics = require('../controllers/topics');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var _ = require('lodash');
var Topic = mongoose.model('Topic');
var Vote = require('../../public/assets/vote.server');

module.exports = function(app, io, passport) {
  // main route
  app.get('/', function(req, res, next) {
    Topic.find({}).exec(function(err, topics) {
      if(!err) {
        var topicmap = _.indexBy(topics, 'id');
        // pass in data to be seeded into the TopicStore
        res.locals.data =  { TopicStore: { topics: topicmap} };
        next();
      }else {
        console.log('Error in first query');
      }
    });
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

  // This is where the magic happens. We take the locals data we have already 
  // fetched and seed our stores with data.
  // Vote is a function that requires store data to initialize and return the React-rendered html string
  app.use(function(req, res) {
    var content = Vote(JSON.stringify(res.locals.data || {}));
    res.render('index', { 
      isomorphic: content
    });
  });

  // Adding this in as an example
  io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world'});
    socket.on('my other event', function(data) {
      console.log(data);
    });
  });
};
