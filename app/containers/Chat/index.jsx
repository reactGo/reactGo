import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/chat';

const cx = classNames.bind(styles);

import ChatWindow from './components/ChatWindow';
import TextArea from './components/TextArea';
import UserList from './components/UserList';

import socketDispatcher from './socketDispatcher';

class Chat extends Component {

  constructor(props) {
    super(props);
    console.log('CHAT CON');
  }

  componentDidMount() {
    console.log('CHAT MOUNTER');
    let { dispatch } = this.props;
    this.socket = socketDispatcher(dispatch);
    this.socket.emit('add user', 'TESTNAME');
  }

  render() {
    return (
      <div className={cx('chat')}>
        <h1 className={cx('header')}>CHAT</h1>
        <ChatWindow/>
        <TextArea/>
        <UserList
          users={['test', 'bob']}
        />
      </div>
    );
  }
}

/*
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
*/

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
