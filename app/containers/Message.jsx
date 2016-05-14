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
    const {text, style} = this.props;
    const classes = [style, {show: text && text.length > 0}];

    return (
      <div className={cx('message', classes)} onClick={this.onDismiss}>{text}</div>
    );
  }
}

Message.propTypes = {
  style: PropTypes.string,
  text: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps)(Message);
