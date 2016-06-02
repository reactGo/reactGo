import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/chatwindow';

const cx = classNames.bind(styles);

const ChatWindow = (props) => {


  const renderMessage = (val, index) =>{

    return (
      <li
        key={index}
      >
        <p>{val.username}: </p>
        <p>{val.message}</p>
      </li>
    )
  }

  return (
    <div className={cx('chatwindow')}>
      <ul className={cx('messageWindow')}>
        { props.messages.map(renderMessage) }
      </ul>
    </div>
  );
};

export default ChatWindow;
