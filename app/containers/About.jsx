import React from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class About extends React.Component {
  render() {
    return (
      <div className={cx('about')}>
        <h1 className={cx('about__header')}>About Ninja Ocean</h1>
        <p className={cx('about__description')}>Ninja Ocean is comprised of a team of passionate developers, hackers & scientists, aimed to do good.</p>
      </div>
    );
  }
};
