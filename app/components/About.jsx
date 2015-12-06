import React from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_about';

const cx = classNames.bind(styles);

export default class About extends React.Component {
  render() {
    return (
      <div className={cx('about')}>
        <h1 className={cx('about__header')}>About Ninja Ocean</h1>
        <p className={cx('about__description')}>Ninja Ocean is comprised of a team of passionate developers, hackers & scientists, aimed to do good.</p>
      </div>
    );
  }
}
