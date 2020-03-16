import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from '../actions/messages';
import styles from '../css/components/message';

const cx = classNames.bind(styles);

const Message = ({ message, type, dismissMessage }) => (
  <div
    role="presentation"
    className={cx('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS',
    })}
    onClick={dismissMessage}>
    {message}
  </div>
);

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired,
};

Message.defaultProps = {
  message: '',
  type: '',
};

function mapStateToProps(state) {
  return { ...state.message };
}

export default connect(mapStateToProps, { dismissMessage })(Message);
