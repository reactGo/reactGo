import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import styles from 'scss/components/_navigation';

class Navigation extends Component {

  render() {
    const { dispatch } = this.props;
    return (
      <nav className={styles.navigation} role="navigation">
          <Link to="/" className={styles.navigation__item + ' ' + styles['navigation__item--logo']} activeClassName={styles['navigation__item--active']}>Ninja Ocean</Link>
          { this.props.user.authenticated ? (
            <Link onClick={()=> dispatch(logOut())}
              className={styles.navigation__item} to="/logout">Logout</Link>
          ) : (
            <Link className={styles.navigation__item} to="/login">Log in</Link>
          )}
          <Link className={styles.navigation__item} to="/dashboard">Dashboard</Link>
          <Link to="/about" className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>About</Link>
      </nav>
    );
  }

}

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
