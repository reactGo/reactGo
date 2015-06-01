var _ = require('lodash');
var alt = require('../alt');
var NoteWebAPIUtils = require('../utils/NoteWebAPIUtils');

/**
 * Declaring NoteActions using ES2015. This is equivalent to creating
 * function NoteActions() {};
 * NoteActions.prototype.create() = function(data) {}
 */
class NoteActions {
  savenote(data) {
    // Make an optimistic update
    var id = Date.now().toString();
    _.merge(data, {
      id: id,
      isEdit: false
    });
    this.dispatch(data);

    // Make API call to server to add note
    NoteWebAPIUtils.create(data)
      .done(function(res) {
        console.log(res);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        // dispatch an event if fails to notify user that it has failed
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
  }

  getnotes() {
    var _this = this;
    NoteWebAPIUtils.getAll()
      .done(function(res) {
        _this.dispatch(res);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        // dispatch an event if fails to notify user that it has failed
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      });
  }
}

module.exports = alt.createActions(NoteActions);
