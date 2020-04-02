import React from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dispatchLogOut = () => dispatch(logOut());

  return (
    <nav className={cx('navigation')} role="navigation">
      <Link
        to="/"
        className={cx('item', 'logo')}
        activeClassName={cx('active')}
      >
        Ninja Ocean
      </Link>
      {user.authenticated ? (
        <Link
          onClick={dispatchLogOut}
          className={cx('item')}
          to="/"
        >
          Logout
        </Link>
      ) : (
        <Link className={cx('item')} to="/login">Log in</Link>
      )}
      <Link className={cx('item')} to="/dashboard">Dashboard</Link>
      <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
    </nav>
  );
};

export default Navigation;
