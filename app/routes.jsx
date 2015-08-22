import React from 'react';
import Route from 'react-router';

import App from 'components/App';
import Vote from 'components/Vote';
import About from 'components/About';
import Login from 'components/Login';
import Logout from 'components/Logout';
import Dashboard from 'components/Dashboard';

import UserStore from 'stores/UserStore';

function requireAuth(nextState, transition) {
  if (!UserStore.getState().user.get('authenticated')) {
    transition.to('/login', null, { nextPathname: nextState.location.pathname });
  }
}

export default (
  <Route component={App}>
    <Route path="/" component={Vote} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    <Route path="about" component={About} />
  </Route>
);
