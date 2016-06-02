import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/textarea';

const cx = classNames.bind(styles);

const TextArea = () => {
  return (
    <textarea
      className={cx('textarea')}
      placeholder={'write a message'}
    >
    </textarea>
  );
};

export default TextArea;
