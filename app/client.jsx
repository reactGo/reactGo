import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { AppContainer } from 'react-hot-loader';
import createBrowserHistory from 'history/createBrowserHistory';
import routes from './routes';
import configureStore from './store/configureStore';
import PendingNavDataLoader from './PendingNavDataLoader';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;
const history = createBrowserHistory();
const store = configureStore(initialState, history);
delete window.__INITIAL_STATE__;
// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig

const renderDOM = (r) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PendingNavDataLoader routes={routes} store={store}>
            {renderRoutes(r)}
          </PendingNavDataLoader>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderDOM(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes').default;
    renderDOM(newRoutes);
  });
}
