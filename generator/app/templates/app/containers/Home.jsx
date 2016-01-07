import React from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_home';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class Home extends React.Component {

  render() {
    return (
      <div className={cx('home')}>
        <h1 className={cx('home__header')}>Welcome to react-webpack-node!</h1>
      </div>
    );
  }
  
};
