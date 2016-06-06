import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/chatwindow';
import classnames from 'classnames';

const cx = classNames.bind(styles);

const ChatWindow = (props) => {


  const uuidToColor = (uuid) => {
    console.log('uuidToColor',uuid);

    var parts = uuid.split('-');
    var ints = parts.map(function(d) { return parseInt(d,16) });
    var code = ints[0]

    var blue = (code >> 16) & 31;
    var green = (code >> 21) & 31;
    var red = (code >> 27) & 31;
    var foreColor = "rgb(" + (red << 3) + "," + (green << 3) + "," + (blue << 3) + ")";

    return foreColor;
  }

  const renderMessage = (val, index) => {

    let {username, message} = val;

    const isUser = () => {
      return  username === props.self;
    }

    const itemClass = () => {
      let messageClass = isUser() ? classnames(styles.message, styles.userMessage) : styles.message;
      return messageClass;
    }

    const colorStyle = () => {
      return {
        color:uuidToColor(username)
      };
    }

    const userName = () => {
      return isUser() ? 'You': username;
    }

    return (
      <li
        key={index}
        className={itemClass()}
      >
        <p style={colorStyle()}>{userName()}: </p>
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
