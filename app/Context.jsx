import * as React from 'react';
import { userStore, postStore } from './store';

export const storeContext = React.createContext({
  userStore,
  postStore,
});

export const StoreProvider = ({ children }) => {
  return (
    <storeContext.Provider>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
