import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from './components/App.react';
import Vote from './components/Vote.react';
import About from './components/About.react';
import Login from './components/Login.react';
import Logout from './components/Logout.react';

const routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="vote" handler={Vote} />
    <Route name="about" handler={About} />
    <DefaultRoute handler={Vote} />
  </Route>
);

export default routes;
