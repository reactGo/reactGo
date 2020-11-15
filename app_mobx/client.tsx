import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';

import createStoreProvider, { store } from './Context';
import App from './pages/App';
import { routingStore } from './store';

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routingStore);
const StoreProvider = createStoreProvider(store);
render(
  <StoreProvider>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('app'),
);
