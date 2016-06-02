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
  }

  componentDidMount() {
    let { dispatch } = this.props;
    this.socket = socketDispatcher(dispatch);
    this.socket.emit('add user', 'TESTNAME');
  }

  sendMessage() {
    this.socket.emit('new message', 'some new message');
  }

  render() {
    return (
      <div className={cx('chat')}>
        <h1 className={cx('header')}>CHAT</h1>
        <ChatWindow
          messages={this.props.messages}
        />
        <TextArea
          message={this.props.myMessage}
        />
        <div onClick={ () => {
            this.sendMessage()
        }}>
          SEND MESSAGE
        </div>

        <UserList
          users={this.props.users}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  let { chat:{ myMessage, messages, users}} = state;

  myMessage = myMessage || '';
  messages = messages || [];
  users = users || [];

  return {
    myMessage,
    messages,
    users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
