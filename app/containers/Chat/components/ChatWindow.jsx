import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/chatwindow';

const cx = classNames.bind(styles);

const ChatWindow = (props) => {


  const renderMessage = (val, index) => {

    let { username, message } = val;
    console.log('val',val);

    const selectClass = () => {
      let selClass = username === props.self ? 'sel' : '';
      return selClass;
    }


    return (
      <li
        key={index}
        className={selectClass()}
      >
        <p>{username}: </p>
        <p>{message}</p>
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
