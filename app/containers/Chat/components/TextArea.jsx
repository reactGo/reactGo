import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/textarea';

import {
  composeChat
} from 'actions/chat';

const cx = classNames.bind(styles);

const TextArea = (props) => {
  return (

    <textarea
      className={cx('textarea')}
      placeholder={'write a message'}
      onChange={props.onChange}
      value={props.message}
    >
    </textarea>
  );
};

//export default TextArea;


const mapDispatchToProps = (dispatch) => ({
  onChange(el) {
    let text = el.target.value;
    dispatch(composeChat(text));
  }
});

export default connect(null, mapDispatchToProps)(TextArea);
