import React from 'react';
import classNames from 'classnames/bind';
import styles from 'scss/components/_about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = props => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('about__header')}>About Ninja Ocean</h1>
      <div className={cx('about__description')}>
        <p>Imagine an ocean of ninjas. Now think of it as a metaphor.<br />
          Seriously, we love good tech. React, redux, scala, Haskell, machine learning, you name it!
        </p>
      </div>
      <div className={cx('about__contribute')}>
        <p>Want to contribute? Help us out!</p>
        <p>
          If you think the code on &nbsp;
          <a target="_blank" href="https://github.com/choonkending/react-webpack-node">this repo</a>
        &nbsp;could be improved, please create an issue&nbsp;
          <a target="_blank" href="https://github.com/choonkending/react-webpack-node/issues">here</a>!
        </p>
      </div>
    </div>
  );
};

export default About;
