import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from '../actions/messages';
import styles from '../css/components/message';

const cx = classNames.bind(styles);

const Message = () => {
  const { message, type } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const dispatchDismissMessage = () => dispatch(dismissMessage());

  return (
    <div
      role="presentation"
      className={cx('message', {
        show: message && message.length > 0,
        success: type === 'SUCCESS',
      })}
      onClick={dispatchDismissMessage}>
      {message}
    </div>
  );
};

export default Message;
