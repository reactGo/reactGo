import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from 'reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import createLogger from 'redux-logger';

/*
 * Store Configurations
 *
 * @param {Object}         Initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} A history object. `createMemoryHistory` for server-side rendering
 *                         and `browserHistory` for client-side rendering.
 */
export default function configureStore(initialState, history) {
  // Configuration of redux-axios-middleware
  const client = axios.create({
    baseURL:`http://${process.env.HOSTNAME || "localhost"}:${process.env.PORT || "3000"}`,
    responseType: 'json'
  });

  // Configuration of react-redux-loading-bar
  const loading = {
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'EXCEPTION']
  };

  // Common middlewares
  const middlewares = [
    axiosMiddleware(client), // Handle requests on client side
    loadingBarMiddleware(loading), // Global loading bar integration
    routerMiddleware(history) // Keep react-router sync with redux store
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
