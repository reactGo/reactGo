import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import styles from 'scss/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({user, dispatch}) => {
    return (
      <nav className={styles.navigation} role="navigation">
        <Link to="/"
          className={cx('navigation__item', 'navigation__item--logo')}
          activeClassName={styles['navigation__item--active']}>Ninja Ocean</Link>
          { user.authenticated ? (
            <Link onClick={()=> dispatch(logOut())}
              className={styles.navigation__item} to="/">Logout</Link>
          ) : (
            <Link className={styles.navigation__item} to="/login">Log in</Link>
          )}
          <Link className={styles.navigation__item} to="/dashboard">Dashboard</Link>
          <Link to="/about" className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>About</Link>
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Navigation);
