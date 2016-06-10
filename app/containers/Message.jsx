import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from 'actions/messages';
import styles from 'css/components/message';

const cx = classNames.bind(styles);

const Message = ({style, text, dismissMessage}) => (
    <div className={cx('message', [style, {show: text && text.length > 0}])}
      onClick={dismissMessage}
    >{text}</div>
);

Message.propTypes = {
  style: PropTypes.string,
  text: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps, { dismissMessage })(Message);
