import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Vote from 'containers/Vote';
import About from 'containers/About';
import Login from 'containers/Login';
import Dashboard from 'containers/Dashboard';

import { requireAuthentication } from 'helpers/authHelpers';

function requireAuth(nextState, replace) {
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Vote} />
    <Route path="login" component={Login} />
    <Route path="dashboard" component={requireAuthentication(Dashboard)} />
    <Route path="about" component={About} />
  </Route>
);
