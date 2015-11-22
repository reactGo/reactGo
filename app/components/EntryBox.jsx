import React from 'react';
import { connect } from 'react-redux';
import { createTopic, typing } from 'actions/topics';
import styles from 'scss/components/_entrybox';
import TopicTextInput from 'components/TopicTextInput';

class EntryBox extends React.Component {

  render() {
    const { dispatch } = this.props;
    return (
      <div className={styles.entrybox}>
        <h1 className={styles.entrybox__header}>Vote for your top hack idea</h1>
        <TopicTextInput
          className={styles.entrybox__input}
          value={this.props.topic}
          placeholder="What's yer fav idea?"
          onChange={text => dispatch(typing(text))}
          onSave={text => dispatch(createTopic(text))} />
      </div>
    );
  }
}

EntryBox.propTypes = { topic: React.PropTypes.string, dispatch: React.PropTypes.func };

export default connect()(EntryBox);
