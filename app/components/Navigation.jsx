import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'redux/actions/users';
import styles from 'scss/components/_navigation';

class Navigation extends React.Component {

  _onLogout = () => {
    this.dispatch(logOut());
  }

  render() {
    return (
      <nav className={styles.navigation} role="navigation">
          <Link to="/" className={styles.navigation__item + ' ' + styles['navigation__item--logo']} activeClassName={styles['navigation__item--active']}>Ninja Ocean</Link>
          { this.props.UserStore.user.get('authenticated') ? (
            <Link onClick={this._onLogout} className={styles.navigation__item} to="/logout">Logout</Link>
          ) : (
            <Link className={styles.navigation__item} to="/login">Log in</Link>
          )}
          <Link className={styles.navigation__item} to="/dashboard">Dashboard</Link>
          <Link to="/about" className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>About</Link>
      </nav>
    );
  }

}

Navigation.propTypes = { UserStore: React.PropTypes.object };

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Navigation);
