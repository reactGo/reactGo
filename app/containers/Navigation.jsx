import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const dispatchLogOut = () => dispatch(logOut());
  // activeClassName issues https://github.com/ReactTraining/react-router/issues/6201
  return (
    <nav className={cx('navigation')} role="navigation">
      <NavLink to="/" className={cx('item', 'logo')} activeClassName={cx('active')}>Ninja Ocean</NavLink>
      {user.authenticated ? (
        <NavLink onClick={dispatchLogOut} className={cx('item')} to="/">Logout</NavLink>
      ) : (
        <NavLink className={cx('item')} to="/login" activeClassName={cx('active')}>Log in</NavLink>
      )}
      <NavLink className={cx('item')} to="/dashboard" activeClassName={cx('active')}>Dashboard</NavLink>
      <NavLink to="/about" className={cx('item')} activeClassName={cx('active')}>About</NavLink>
    </nav>
  );
};

export default Navigation;
