import React, { Component } from 'react';
import styles from 'scss/components/_logout';

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class Logout extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.logout__header}>Hey m8, you have been logged out</h1>
      </div>
    );
  }
};
