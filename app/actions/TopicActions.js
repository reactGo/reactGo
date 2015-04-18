var TopicWebAPIUtils = require('../utils/TopicWebAPIUtils');
var alt = require('../alt');
/*
 * Declaring TopicActions using ES2015. This is equivalent to creating
 * function TopicActions() {}
 * AND
 * TopicActions.prototype.create() = function(data) {}
 */
class TopicActions {

  /*
   * @param text for you to type in
   */
  create(text) {
    var id, data;

    // Remove whitespace
    if(text.trim().length > 0) {
      // Using the current timestamp in place of a real id.
      id = Date.now().toString();
      data = {
        id: id,
        count: 1,
        text: text
      };

      // This dispatches for views to make optimistic updates
      this.dispatch(data);
      // Makes an additional call to the server API and actually adds the topic
      TopicWebAPIUtils.addTopic(data)
        .done(function(data, textStatus, jqXHR) {
          // We might not need to do anything it successfully added due to optimistic updates.
          console.log(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          // dispatch an event if fails to notify user that it has failed
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
        });
    } else {
      // Notify something
    }
  }

  /*
   * @param String topic id to increment with
   */
  increment(id) {
    this.dispatch(id);

    TopicWebAPIUtils.updateTopic({ id: id }, false, true);
  }

  /*
   * @param String topic id to decrement with
   */
  decrement(id) {
    this.dispatch(id);

    TopicWebAPIUtils.updateTopic({ id: id }, false, false);
  }

  /*
   * @param String topic id to destroy
   */
  destroy(id) {
    this.dispatch(id);

    // Keeping it consistent with the above
    TopicWebAPIUtils.deleteTopic({id: id});
  }
}

module.exports = alt.createActions(TopicActions);


// module.exports = {


//   /**
//    * @param  {string} id The ID of the ToDo item
//    * @param  {string} text
//    */
//   updateText: function(id, text) {
//     AppDispatcher.dispatch({
//       actionType: Constants.TODO_UPDATE_TEXT,
//       id: id,
//       text: text
//     });
//   },

//   /**
//    * Toggle whether a single ToDo is complete
//    * @param  {object} todo
//    */
//   toggleComplete: function(todo) {
//     var id = todo.id;
//     if (todo.complete) {
//       AppDispatcher.dispatch({
//         actionType: Constants.TODO_UNDO_COMPLETE,
//         id: id
//       });
//     } else {
//       AppDispatcher.dispatch({
//         actionType: Constants.TODO_COMPLETE,
//         id: id
//       });
//     }
//   },

//   /**
//    * Mark all ToDos as complete
//    */
//   toggleCompleteAll: function() {
//     AppDispatcher.dispatch({
//       actionType: Constants.TODO_TOGGLE_COMPLETE_ALL
//     });
//   }

// };
