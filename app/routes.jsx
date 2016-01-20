import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Vote from 'containers/Vote';
import About from 'containers/About';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

import { requireAuth } from 'helpers/authHelpers';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Vote} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="about" component={About} />
  </Route>
);
