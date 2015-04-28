var $ = require('jquery');
var _ = require('lodash');

// Placing configuration here, might consider moving it elsewhere
var defaultConfig = {
  url: '/topic',
  type: 'GET',
  dataType: 'json'
};

module.exports = {
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

  /*
   * @param Object - partial topic or id
   * @param Boolean - if this is a full update then we have to specify it
   * @param Boolean - true if increment, false if decrement
   */
  updateTopic: function(topic, isFull, isIncrement) {
    $.ajax({
      url: '/topic',
      data: JSON.stringify(_.extend(topic, {
        isFull: isFull,
        isIncrement: isIncrement
      })),
      type: 'PUT',
      contentType: 'application/json'
    })
      .then(function(data, textStatus, jqXHR) {
        console.log(data);
      }, function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      });
  },

  deleteTopic: function(topic) {
    return $.ajax({
      url: '/topic',
      data: JSON.stringify(topic),
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
  }
};
