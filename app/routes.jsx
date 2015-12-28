import React from 'react';
import Route from 'react-router';

import App from 'containers/App';
import Vote from 'containers/Vote';
import About from 'containers/About';
import Login from 'containers/Login';
import Logout from 'containers/Logout';
import Dashboard from 'containers/Dashboard';

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
