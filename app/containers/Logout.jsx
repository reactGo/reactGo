import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/logout';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Logout = () => {
  return (
    <div className={cx('logout')}>
      <h1 className={cx('header')}>Thanks for stopping by!</h1>
      <div className={cx('description')}>
        <p><Link to="/login">Click here</Link> to log back in.</p>
      </div>
    </div>
  );
};

export default Logout;
