import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { showMessage } from 'actions/messages';
import { signOut } from 'actions/users';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, signOut, push, showMessage }) => {
    const logout = () => {
      signOut()
        .then(() => {
          showMessage('success', 'See you!');
          push('/');
        })
        .catch((response) => {
          showMessage('error', 'You can modify this to override default error message.');
        });
    }

    return (
      <nav className={cx('navigation')} role="navigation">
        <Link to="/"
          className={cx('item', 'logo')}
          activeClassName={cx('active')}>Ninja Ocean</Link>
          {
            user.authenticated
            ? (<a className={cx('item')} onClick={logout}>Logout</a>)
            : (<Link className={cx('item')} to="/login">Log in</Link>)
          }
          <Link className={cx('item')} to="/dashboard">Dashboard</Link>
          <Link to="/about" className={cx('item')} activeClassName={cx('active')}>About</Link>
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { signOut, push, showMessage })(Navigation);
