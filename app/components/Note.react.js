var React = require('react');
var NoteActions = require('../actions/NoteActions');

var Note = React.createClass({
  _onSave: function(evt) {
    var dom = React.findDOMNode(this);
    var title = dom.querySelector('.note__title--edit').value;
    var description = dom.querySelector('.note__description--edit').value;
    // Call NoteAction to save it to the database
    NoteActions.savenote({
      title: title,
      description: description
    });
  },

  render: function() {
    var note;
    if(this.props.isEdit) {
       note = (
      <div className="note">
        <input className="note__title--edit" />
        <textarea className="note__description--edit"></textarea>
        <button onClick={this._onSave} className="note__button note__button--green">Add a Note</button>
      </div>);
    } else {
      note = (
        <div className="note note--tile">
          <div className="note__title">{this.props.title}</div>
          <div className="note__description">{this.props.description}</div>
        </div>
      );
    }

    return note;
  }
});

module.exports = Note;
