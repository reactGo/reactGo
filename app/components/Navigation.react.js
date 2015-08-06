import React from 'react';
import { Link } from 'react-router';

import UserActions from 'actions/UserActions';

import styles from 'scss/components/_navigation';

export default class Navigation extends React.Component {

  _onLogout = () => {
    UserActions.logout();
  }

  render() {
    const loginOrOut = this.props.UserStore.user.get('authenticated') ?
      <Link onClick={this._onLogout} className={styles.navigation__item} to="logout">Logout</Link> :
      <Link className={styles.navigation__item} to="login">Log in</Link>;
    return (
      <nav className={styles.navigation} role="navigation">
          <Link to="/" className={styles.navigation__item + ' ' + styles['navigation__item--logo']} activeClassName={styles['navigation__item--active']}>Ninja Ocean</Link>
          { loginOrOut }
          <Link to="about" className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>About</Link>
      </nav>
    );
  }

}

Navigation.propTypes = { UserStore: React.PropTypes.object };
