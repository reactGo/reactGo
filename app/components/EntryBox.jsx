import React from 'react';
import PropTypes from 'prop-types';

import { EntryBoxWrapper, Header, Input } from '../css/components/entrybox';

// Takes callback functions from props and passes it down to TopicTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TopicTextInput up to EntryBox so it's less confusing
const EntryBox = ({ onEntryChange, onEntrySave, topic }) => {
  return (
    <EntryBoxWrapper>
      <Header>Vote for your top hack idea</Header>
      <Input
        value={topic}
        placeholder="Suggest a hackday idea . . ."
        onEntryChange={onEntryChange}
        onEntrySave={onEntrySave} />
    </EntryBoxWrapper>
  );
};

EntryBox.propTypes = {
  topic: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onEntrySave: PropTypes.func.isRequired,
};

EntryBox.defaultProps = {
  topic: '',
};

export default EntryBox;
