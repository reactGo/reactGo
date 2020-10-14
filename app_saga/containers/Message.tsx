import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dismissMessage } from '../actions/messages';
import { MessageWrapper } from '../css/components/message';

const Message = () => {
  const { message, type } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const dispatchDismissMessage = () => dispatch(dismissMessage());

  return (
    <MessageWrapper
      role="presentation"
      show={message && message.length > 0}
      success={type === 'SUCCESS'}
      onClick={dispatchDismissMessage}>
      {message}
    </MessageWrapper>
  );
};

export default Message;
