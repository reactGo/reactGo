import { FC } from 'react';
import * as React from 'react';
import createStore, { Store } from './store';

// Grab the state from a global injected into
// server-generated HTML
export const store = createStore(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : {});
export const storeContext = React.createContext(store);

interface Props {
  children: React.ReactChildren;
}

export default (paramStore: Store): FC<Props> => ({ children }) => {
  return (
    <storeContext.Provider value={paramStore}>
      {children}
    </storeContext.Provider>
  );
};
