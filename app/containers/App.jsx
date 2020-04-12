import React from 'react';
import { Switch } from 'react-router-dom';
import classNames from 'classnames/bind';
import { renderRoutes } from 'react-router-config';

import Navigation from './Navigation';
import Message from './Message';
import styles from '../css/main';

const cx = classNames.bind(styles);

const App = ({ route }) => (
  <div className={cx('app')}>
    <Navigation />
    <Message />
    <Switch>
      {renderRoutes(route.routes)}
    </Switch>
  </div>
);

export default App;
