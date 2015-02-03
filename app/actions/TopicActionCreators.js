var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var TopicStore = require('../stores/TopicStore');
var TopicWebAPIUtils = require('../utils/TopicWebAPIUtils');

module.exports = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE_TOPIC,
      text: text
    });

    if(text.trim().length > 0) {
      // This feels very much like we are doing twice the work here. Dispatching which will be sent to the store,
      // and then calling the store to return you have done already. This might be the downside of flux?
      var topic = TopicStore.getCreatedTopicData(text);
      TopicWebAPIUtils.addTopic(topic);
    }

  },

  increment: function(id, text) {
    AppDispatcher.dispatch({
      actionType: Constants.TOPIC_INCREMENT,
      id: id
    });
  },

  decrement: function(id, text) {
    AppDispatcher.dispatch({
      actionType: Constants.TOPIC_DECREMENT,
      id: id
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: Constants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    if (todo.complete) {
      AppDispatcher.dispatch({
        actionType: Constants.TODO_UNDO_COMPLETE,
        id: id
      });
    } else {
      AppDispatcher.dispatch({
        actionType: Constants.TODO_COMPLETE,
        id: id
      });
    }
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: Constants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: Constants.TOPIC_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: Constants.TODO_DESTROY_COMPLETED
    });
  }

};
