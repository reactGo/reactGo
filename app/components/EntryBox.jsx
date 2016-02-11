import React, { Component, PropTypes } from 'react';
import TopicTextInput from 'components/TopicTextInput';
import classNames from 'classnames/bind';
import styles from 'scss/components/_entrybox';

const cx = classNames.bind(styles);

// Takes callback functions from props and passes it down to TopicTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TopicTextInput up to EntryBox so it's less confusing
const EntryBox = ({onEntryChange, onEntrySave, topic}) => {
  return (
    <div className={cx('entrybox')}>
      <h1 className={cx('entrybox__header')}>Vote for your top hack idea</h1>
      <TopicTextInput
        className={cx('entrybox__input')}
        value={topic}
        placeholder="What's yer fav idea?"
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </div>
  );
};

EntryBox.propTypes = {
  topic: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired
};

export default EntryBox;
