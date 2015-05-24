var alt = require('../alt');

/*
 * Declaring NoteActions using ES2015. This is equivalent to creating
 * function NoteActions() {}
 * AND
 * NoteActions.prototype.create() = function(data) {}
 */
class NoteActions {

    /*
     *  @param String text that user is typing in input field
     */
    typing(text) {
      this.dispatch(text);
    }

}

module.exports = alt.createActions(NoteActions);
