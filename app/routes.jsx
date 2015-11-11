import React from 'react';
import Route from 'react-router';

import App from 'components/App';
import Vote from 'components/Vote';
import About from 'components/About';
import Login from 'components/Login';
import Logout from 'components/Logout';
import Dashboard from 'components/Dashboard';

import { requireAuthentication } from 'components/authenticateComponent';

export default (
  <Route component={App}>
    <Route path="/" component={Vote} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="dashboard" component={requireAuthentication(Dashboard)} />
    <Route path="about" component={About} />
  </Route>
);
