import React from 'react';
import ReactDOM from 'react-dom';
import Iso from 'iso';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Router } from 'react-router';

import alt from 'altInstance';
import routes from 'routes.jsx';

/*
 * Client side bootstrap with iso and alt
 */
Iso.bootstrap((state, _, container) => {
  alt.bootstrap(state);
  ReactDOM.render(<Router history={createBrowserHistory()} children={routes} />, container);
});
