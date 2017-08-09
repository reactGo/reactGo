import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { renderRoutes } from 'react-router-config';
import Navigation from '../containers/Navigation';
import Message from '../containers/Message';
import styles from '../css/main';

const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const App = ({ route }) => (
  <div className={cx('app')}>
    <Navigation />
    <Message />
    {renderRoutes(route.routes)}
  </div>
);

App.propTypes = {
  route: PropTypes.object,
};

export default App;
