import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import styles from 'scss/components/_navigation';

class Navigation extends Component {

  render() {
    return (
      <nav className={styles.navigation} role="navigation">
        <Link to="/" className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>Home</Link>
        <Link to="/about" className={styles.navigation__item} activeClassName={styles['navigation__item--active']}>About</Link>
      </nav>
    );
  }

}

export default Navigation;