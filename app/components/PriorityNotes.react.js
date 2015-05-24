var React = require('react');
var Note = require('./Note.react');
var NoteActions = require('../actions/NoteActions');
var NoteStore = require('../stores/NoteStore');

var PriorityNotes = React.createClass({
  getInitialState: function() {
    return {
      list: NoteStore.getState().list,
      listItem: NoteStore.getState().listItem
    };
  },

  componentDidMount: function() {
    NoteStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    NoteStore.unlisten(this.onChange);
  },

  onChange: function() {
    this.setState({
      list: NoteStore.getState().list,
      listItem: NoteStore.getState().listItem
    });
  },

  render: function() {
    return (
      <div className="priority-note">
        <h1>Add a note for your day m8</h1>
        <Note />
      </div>
    );
  }

});

module.exports = PriorityNotes;
