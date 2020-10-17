import React from 'react';
import { RouteConfig } from 'react-router-config';
import { Store } from 'redux';

import App from './containers/App';
import NotFound from './pages/NotFound';
import Vote from './pages/Vote';
import LoginOrRegister from './pages/LoginOrRegister';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import { getTopicsRequest } from './actions/topics';

const routes: RouteConfig[] = [{
  component: App as React.ComponentType,
  routes: [{
    path: '/',
    exact: true,
    component: Vote,
    fetchData: (store: Store) => {
      return store.dispatch(getTopicsRequest());
    },
  }, {
    path: '/login',
    component: LoginOrRegister,
  }, {
    path: '/dashboard',
    component: Dashboard,
  }, {
    path: '/about',
    component: About,
  }, {
    path: '*',
    component: NotFound
  }],
}];

export default routes;
