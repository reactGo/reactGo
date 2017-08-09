import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (
      <nav className={cx('navigation')} role="navigation">
        <NavLink
          to="/"
          className={cx('item', 'logo')}
          activeClassName={cx('active')}>Ninja Ocean</NavLink>
          { user.authenticated ? (
            <NavLink
              onClick={logOut}
              className={cx('item')} to="/">Logout</NavLink>
          ) : (
            <NavLink className={cx('item')} to="/login">Log in</NavLink>
          )}
        <NavLink className={cx('item')} to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about" className={cx('item')} activeClassName={cx('active')}>About</NavLink>
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
