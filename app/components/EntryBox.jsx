import React from 'react';
import { useObserver } from 'mobx-react';

import { EntryBoxWrapper, Header, Input } from '../css/components/entrybox';

// Takes callback functions from props and passes it down to TopicTextInput
// Essentially this is passing the callback function two levels down from parent
// to grandchild. To make it cleaner, you could consider:
// 1. moving `connect` down to this component so you could mapStateToProps and dispatch
// 2. Move TopicTextInput up to EntryBox so it's less confusing
const EntryBox = () => {
  return useObserver(() => (
    <EntryBoxWrapper>
      <Header>Vote for your top hack idea</Header>
      <Input
        placeholder="Suggest a hackday idea . . ."
      />
    </EntryBoxWrapper>
  ));
};

export default EntryBox;
