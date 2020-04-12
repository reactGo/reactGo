import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import App from './pages/App';
import * as types from './types';
import configureStore from './store/configureStore';
import fetchDataForRoute from './utils/fetchDataForRoute';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const history = createBrowserHistory();
const store = configureStore(initialState, history);

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  // Explanation: On server-side render, we already have __INITIAL_STATE__
  // So when the client side onUpdate kicks in, we do not need to fetch twice.
  // We set it to null so that every subsequent client-side navigation will
  // still trigger a fetch data.
  // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  store.dispatch({ type: types.CREATE_REQUEST });
  fetchDataForRoute(this.state)
    .then((data) => {
      return store.dispatch({ type: types.REQUEST_SUCCESS, data });
    });
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history} onUpdate={onUpdate}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('app')
);
