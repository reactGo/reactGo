import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/chatwindow';

const cx = classNames.bind(styles);

const ChatWindow = () => {
  return (
    <div className={cx('chatwindow')}>
      <ul className={cx('messageWindow')}></ul>
    </div>
  );
};

export default ChatWindow;
