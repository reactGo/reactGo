import React from 'react';

import { MessageWrapper } from '../css/components/message';
import useStore from '../useStore';

const Message = () => {
  const { messageStore: { message, type, dismissMessage } } = useStore();

  return (
    <MessageWrapper
      role="presentation"
      show={message && message.length > 0}
      success={type === 'SUCCESS'}
      onClick={dismissMessage}>
      {message}
    </MessageWrapper>
  );
};

export default Message;
