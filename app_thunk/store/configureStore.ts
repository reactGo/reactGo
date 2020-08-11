import { createStore, applyMiddleware, compose, Store } from 'redux';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from '../reducers';
import { isClient, isDebug } from '../../config/app';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState: any, history: History) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, routerMiddleware(history)];
  let store: Store;

  if (isClient && isDebug) {
    middleware.push(createLogger());
    store = createStore(createRootReducer(history), initialState, composeWithDevTools(
      applyMiddleware(...middleware),
    ));
  } else {
    store = createStore(createRootReducer(history), initialState, compose(applyMiddleware(...middleware), (f: any) => f));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('../reducers');

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
