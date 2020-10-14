import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MessageWrapper } from '../css/components/message';
import { RootState } from '../reducers';
import messageSlice from '../reducers/message';

const Message = () => {
  const { message, type } = useSelector<RootState, RootState['message']>((state) => state.message);
  const dispatch = useDispatch();
  const dispatchDismissMessage = () => dispatch(messageSlice.actions.dismissMessage());

  return (
    <MessageWrapper
      role="presentation"
      show={message ? message.length > 0 : false}
      success={type === 'SUCCESS'}
      onClick={dispatchDismissMessage}>
      {message}
    </MessageWrapper>
  );
};

export default Message;
