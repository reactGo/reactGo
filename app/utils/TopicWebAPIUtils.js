var $ = require('jquery');
var TopicServerActions = require('../actions/TopicServerActions');

// Placing configuration here, might consider moving it elsewhere
var defaultConfig = {
  url: '/topic',
  type: 'GET',
  dataType: 'json'
};

module.exports = {
  getAllTopics: function() {
    // $.ajax(defaultConfig)
    //   .then(function(data, textStatus, jqXHR) {
    //     TopicServerActions.receiveAllTopics(data);
    //   }, function(jqXHR, textStatus, errorThrown) {
    //     console.log(errorThrown);
    //   });
  },

  /*
   * @param topic provide a topic object {id: String, count: Number, text: String}
   * @return jqXHR object (which implements the Promise interface)
   */
  addTopic: function(topic) {
    return $.ajax({
      url: '/topic',
      data: JSON.stringify(topic),
      type: 'POST',
      contentType: 'application/json'
    });
  },

  updateTopic: function(topic) {
    $.ajax({
      url: '/topic',
      data: JSON.stringify(topic),
      type: 'PUT',
      contentType: 'application/json'
    })
      .then(function(data, textStatus, jqXHR) {
        console.log(data);
      }, function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      });
  },

  deleteTopic: function(id) {
    return $.ajax({
      url: '/topic',
      data: JSON.stringify({id: id}),
      contentType: 'application/json',
      type: 'DELETE'
    });
  },

  /**
   * Listens to the 'topic change' event emitted by the server
   * Whenever another client makes a change. This triggers us to call
   * the getAllTopics() function.
   */
  listenToTopicChanges: function() {
    var hostname = document.location.hostname;
    var socket = io.connect('//' + hostname);
    var _this = this;
    socket.on('topic change', function() {
      _this.getAllTopics();
    });
  },

  /*
   * @param
   */
  updateCountForTopicID: function(id) {
    return $.ajax({
      url: '/topic',
      data: JSON.stringify({id: id}),
      type: 'PUT',
      contentType: 'application/json'
    });
  }
};