import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import axiosMiddleware from 'redux-axios';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';
import clients from 'clients';

/*
 * Store Configurations
 *
 * @param {Object}         Initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} A history object. `createMemoryHistory` for server-side rendering
 *                         and `browserHistory` for client-side rendering.
 */
export default function configureStore(initialState, history) {
  // Configuration of react-redux-loading-bar
  const loading = {
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'EXCEPTION']
  };

  // Common middlewares
  const middlewares = [
    // Wrap all your http requests into http clients with Promise support
    axiosMiddleware(clients),
    // Global loading bar integration
    loadingBarMiddleware(loading),
    // Keep react-router sync with redux store
    routerMiddleware(history)
  ];

  // Development middlewares
  if (__DEVCLIENT__) {
    middlewares.push(createLogger());
  }

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
