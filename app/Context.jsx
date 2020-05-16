import * as React from 'react';
import { userStore, topicStore, messageStore } from './store';

export const storeContext = React.createContext({
  userStore,
  topicStore,
  messageStore,
});

export const StoreProvider = ({ children }) => {
  return (
    <storeContext.Provider>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
