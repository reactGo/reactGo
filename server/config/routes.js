/**
 * Routes for express app
 */
// require('node-jsx').install({ extension: '.jsx', harmony: true })
var topics = require('../controllers/topics');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Iso = require('iso');
var React = require('react');
var Vote = require('../../public/assets/vote.server');
// var Vote = require('../../app/components/Vote.react');
// var alt = require('../../app/alt');
var alt = require('../../public/assets/alt.server');


/**
 * Problem: webpack bundles the component into one version with alt that already has the stores initialized within it
 *          Problem with this is that when we require alt again, it does not have the TopicStore created within it already
 * We could try something like module.exports = { alt, Vote}, and access the same one
 * Or we could try creating an alt Instance that contains the component?
 */
module.exports = function(app, io, passport) {

  app.get('/', function(req, res, next) {
    Topic.find({}).exec(function(err, topics) {
      if(!err) {
        //console.log('Once more into the fray');
        res.locals.data =  { TopicStore: { topics: topics} };
        alt.bootstrap(JSON.stringify(res.locals.data || {}));
        console.log(alt);
        var iso = new Iso();
        var content = React.renderToString(React.createElement(Vote));
        iso.add(content, alt.flush());
        res.render('index', { 
          isomorphic: iso.render()
         });
        // next();
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
  // Then we use iso in order to render this content so it picks it back up
  // on the client side and bootstraps the stores.
  // app.use(function(req, res) {
  //   console.log('local data'  + res.locals.data);
  //   alt.bootstrap(JSON.stringify(res.locals.data || {}));
  //   var iso = new Iso();
  //   var content = React.renderToString(React.createElement(Vote));
  //   iso.add(content, alt.flush());
    
  //   res.render('index', { 
  //     isomorphic: iso.render()
  //    });
  // });

  // Adding this in as an example
  io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world'});
    socket.on('my other event', function(data) {
      console.log(data);
    });
  });
};
