import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';

const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

let createStoreWithMiddleware;
if (canUseDOM) {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger()),
    devTools()
  )(createStore);
} else {
  createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    applyMiddleware(createLogger()),
    devTools()
  )(createStore);
}

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
