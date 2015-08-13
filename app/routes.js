import React from 'react';
import Route from 'react-router';

import App from 'components/App.react';
import Vote from 'components/Vote.react';
import About from 'components/About.react';
import Login from 'components/Login.react';
import Logout from 'components/Logout.react';
import Dashboard from 'components/Dashboard.react';

const requireAuth = (nextState, redirectTo) => {
  redirectTo('/login', null, { nextPathName: nextState.location.pathname });
};

export default (
  <Route component={App}>
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="vote" component={Vote} />
    <Route path="about" component={About} />
  </Route>
);
