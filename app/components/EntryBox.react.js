import React from 'react';
import TopicActions from '../actions/TopicActions';
import TopicTextInput from './TopicTextInput.react';

export default class EntryBox extends React.Component {
  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave = (text) => {
    TopicActions.create(text);
  }

  _onChange = (text) => {
    TopicActions.typing(text);
  }

  render() {
    return (
      <div className="entrybox">
        <h1 className="entrybox__header">Vote for your top hack idea</h1>
        <TopicTextInput className="entrybox__input" value={this.props.topic} placeholder="What's yer fav idea?" onChange={this._onChange} onSave={this._onSave} />
      </div>
    );
  }
}

EntryBox.PropTypes = { topic: React.PropTypes.string };
