import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistory } from 'react-router-redux';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side rendering.
 */
export default function configureStore(initialState, history) {
  let middleware = [ thunk ];
  // Installs hooks that always keep react-router and redux
  // store in sync
  const router = syncHistory(history);
  if (__DEV__) {
    middleware.push(router, createLogger());
  } else {
    middleware.push(router);
  }
  
  const finalCreateStore = applyMiddleware(...middleware)(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
