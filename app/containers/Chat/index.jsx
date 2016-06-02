import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/chat';

const cx = classNames.bind(styles);

import ChatWindow from './components/ChatWindow';
import TextArea from './components/TextArea';
import UserList from './components/UserList';


import socketConnection from './socketConnection';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.socket = socketConnection();
  }

  render() {
    return (
      <div className={cx('chat')}>
        <h1 className={cx('header')}>CHAT</h1>
        <ChatWindow/>
        <TextArea/>
        <div onClick={() => {
          console.log('ONCLICK');
        }}>
          SEND THE MESSAGE
        </div>
        <UserList
          users={['test', 'bob']}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
