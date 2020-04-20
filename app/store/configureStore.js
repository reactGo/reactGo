import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // If you use redux-thunk
import createSagaMiddleware from 'redux-saga'; // If you use redux-saga

import rootSaga from '../sagas'; // If you use redux-saga
import createRootReducer from '../reducers';
import { isClient, isDebug } from '../../config/app';
import { REDUX_ASYNC_MIDDLEWARE } from '../../config/env';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState, history) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [routerMiddleware(history)];
  if (REDUX_ASYNC_MIDDLEWARE === 'thunk') {
    middleware.unshift(thunk);
  } else if (REDUX_ASYNC_MIDDLEWARE === 'saga') {
    const sagaMiddleware = createSagaMiddleware();
    middleware.unshift(sagaMiddleware);
    sagaMiddleware.run(rootSaga);
  }
  let store;

  if (isClient && isDebug) {
    middleware.push(createLogger());
    store = createStore(createRootReducer(history), initialState, composeWithDevTools(
      applyMiddleware(...middleware),
    ));
  } else {
    store = createStore(createRootReducer(history), initialState, compose(applyMiddleware(...middleware), (f) => f));
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
