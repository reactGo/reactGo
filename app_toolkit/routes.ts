import { ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react';
import { RouteConfig } from 'react-router-config';

import { store } from './client';
import App from './containers/App';
import Vote from './pages/Vote';
import LoginOrRegister from './pages/LoginOrRegister';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { getTopics } from './actions/topics';

const routes: RouteConfig[] = [{
  component: App as React.ComponentType,
  routes: [{
    path: '/',
    exact: true,
    component: Vote,
    fetchData: (s: typeof store) => {
      return (s.dispatch as ThunkDispatch<any, any, any>)(getTopics());
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
    component: NotFound,
  }],
}];

export default routes;
