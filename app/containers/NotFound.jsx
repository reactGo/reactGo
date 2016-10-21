import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/not-found';

const cx = classNames.bind(styles);

const NotFound = () => {
  return (
    <div className={cx('not-found')}>
      <h1 className={cx('header')}>404</h1>
      <div className={cx('description')}>
        <p>
          Page not found
        </p>
      </div>
    </div>
  );
};

export default NotFound;
