import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from 'actions/messages';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

class Message extends Component {
  constructor(props) {
    super(props);

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.props.dispatch(dismissMessage());
  }

  render() {
    const {message, type} = this.props;

    return (
      <div className={cx('message', {
        show: message && message.length > 0,
        success: type === 'SUCCESS'
      })} onClick={this.onDismiss}>{message}</div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps)(Message);
