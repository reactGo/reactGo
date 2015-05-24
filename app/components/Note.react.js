var React = require('react');

var Note = React.createClass({
  render: function() {
    return (
      <div className="note">
        <input className="note__title" />
        <hr />
        <textarea className="note__description"></textarea>
        <button className="note__button note__button--green">Add a Note</button>
      </div>);
  }
});

module.exports = Note;
