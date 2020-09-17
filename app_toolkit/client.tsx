import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import App from './pages/App';
import configureStore from './store/configureStore';

const history = createBrowserHistory();
export const store = configureStore(window.__INITIAL_STATE__, history);
export type AppDispatch = typeof store.dispatch;

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.getElementById('app'),
);
