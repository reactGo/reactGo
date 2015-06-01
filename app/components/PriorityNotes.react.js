var React = require('react');
var Note = require('./Note.react');
var NoteActions = require('../actions/NoteActions');
var NoteStore = require('../stores/NoteStore');

var PriorityNotes = React.createClass({
  getInitialState: function() {
    return {
      notes: NoteStore.getState().notes
    };
  },

  componentDidMount: function() {
    NoteStore.listen(this.onChange);
    NoteActions.getnotes();
  },

  componentWillUnmount: function() {
    NoteStore.unlisten(this.onChange);
  },

  onChange: function() {
    this.setState({
      notes: NoteStore.getState().notes
    });
  },

  render: function() {
    // Optionally we can order the notes based on note.order
    var savedNotes = this.state.notes.map(function(note) {
      return (<Note key={note.get('id')}
              isEdit={note.get('isEdit')}
              title={note.get('title')}
              description={note.get('description')}/>);
    });
    var newNote = <Note isEdit={true} />;
    return (
      <div className="priority-note">
        <h1>Add a note for your day m8</h1>
        {newNote}
        {savedNotes}
      </div>
    );
  }

});

module.exports = PriorityNotes;
