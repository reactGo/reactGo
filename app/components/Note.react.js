var React = require('react');
var NoteActions = require('../actions/NoteActions');

var Note = React.createClass({
  _onSave: function(evt) {
    var dom = React.findDOMNode(this);
    var title = dom.querySelector('.note__title').value;
    var desc = dom.querySelector('.note__description').value;
    // Call NoteAction to save it to the database
    NoteActions.savenote({
      title: title,
      desc: desc
    });
  },

  render: function() {
    var note;
    if(this.props.isEdit) {
       note = (
      <div className="note">
        <input className="note__title" />
        <textarea className="note__description"></textarea>
        <button onClick={this._onSave} className="note__button note__button--green">Add a Note</button>
      </div>);
    } else {
      note = (
        <div className="note">
          <p>{this.props.title}</p>
          <p>{this.props.desc}</p>
        </div>
      );
    }

    return note;
  }
});

module.exports = Note;
