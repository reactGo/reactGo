import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

const Message = ({message, type}) => {
  return (
    <div className={cx('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS'
    })}>{message}</div>
  );
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps)(Message);
