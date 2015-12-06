import React, { Component } from 'react';
import styles from 'scss/components/_logout';

export default class Logout extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.logout__header}>Hey m8, you have been logged out</h1>
      </div>
    );
  }
}
