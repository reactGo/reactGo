import React from 'react';
import { connect } from 'react-redux';
import { createTopic, typing } from 'actions/topics';
import styles from 'scss/components/_entrybox';
import TopicTextInput from 'components/TopicTextInput';

class EntryBox extends React.Component {
  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave = (text) => {
    this.props.dispatch(createTopic(text));
  }

  _onChange = (text) => {
    this.props.dispatch(typing(text));
  }

  render() {
    return (
      <div className={styles.entrybox}>
        <h1 className={styles.entrybox__header}>Vote for your top hack idea</h1>
        <TopicTextInput className={styles.entrybox__input} value={this.props.topic} placeholder="What's yer fav idea?" onChange={this._onChange} onSave={this._onSave} />
      </div>
    );
  }
}

EntryBox.propTypes = { topic: React.PropTypes.string, dispatch: React.PropTypes.func };

export default connect()(EntryBox);
