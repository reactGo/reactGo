import { createStore, applyMiddleware, compose, Store } from 'redux';
import { History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { Task } from 'redux-saga'; // If you use redux-saga

import rootSaga from '../sagas'; // If you use redux-saga
import createRootReducer from '../reducers';
import { isClient, isDebug } from '../../config/app';

export interface SagaStore extends Store {
  sagaTask?: Task;
}
/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export default function configureStore(initialState: any, history: History) {
  // Installs hooks that always keep react-router and redux store in sync
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];
  let store;

  if (isClient && isDebug) {
    middleware.push(createLogger());
    store = createStore(createRootReducer(history), initialState, composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ));
  } else {
    middleware.push(createLogger());
    store = createStore(createRootReducer(history), initialState, compose(applyMiddleware(sagaMiddleware)));
  }
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}
