import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import createRootReducer, { RootState } from '../reducers';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default (initialState: any, history: History) => configureStore({
  reducer: createRootReducer(history),
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
  preloadedState: initialState,
});
