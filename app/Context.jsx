import * as React from 'react';
import createStore from './store';

// Grab the state from a global injected into
// server-generated HTML
export const store = createStore(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : {});
export const storeContext = React.createContext(store);

export default (store) => ({ children }) => {
  return (
    <storeContext.Provider value={store}>
      {children}
    </storeContext.Provider>
  );
};
