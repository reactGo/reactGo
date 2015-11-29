import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from 'routes.jsx';
import rootReducer from 'reducers';
import configureStore from 'store/configureStore';

// Grab the state from a global injected into 
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const history = createBrowserHistory();

// Installs hooks that always keep react-router and redux
// store in sync
syncReduxAndRouter(history, store);

render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));

if (process.env.NODE_ENV !== 'production') {
// Use require because imports can't be conditional.
// In production, you should ensure process.env.NODE_ENV
// is envified so that Uglify can eliminate this
// module and its dependencies as dead code.
  require('./createDevToolsWindow')(store);
}
