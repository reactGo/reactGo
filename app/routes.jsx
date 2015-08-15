import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import App from 'components/App';
import Vote from 'components/Vote';
import About from 'components/About';
import Login from 'components/Login';
import Logout from 'components/Logout';

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
