import React from 'react';
import Iso from 'iso';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import { Router } from 'react-router';

import alt from 'altInstance';
import routes from 'routes.jsx';

let history = new BrowserHistory();

/*
 * Client side bootstrap with iso and alt
 */
Iso.bootstrap((state, _, container) => {
  alt.bootstrap(state);
  React.render(<Router history={history} children={routes} />, container);
});

