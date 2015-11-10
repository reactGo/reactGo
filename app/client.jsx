import React from 'react';
import ReactDOM from 'react-dom';
import Iso from 'iso';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from 'redux/store/configureStore';

/*
 * Client side bootstrap with iso and redux
 */
Iso.bootstrap((state, _, container) => {
  let store = configureStore(state);

  ReactDOM.render(
  	<Provider store={store}>
  		{() => <ReduxRouter />}
		</Provider>, container);

  if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
    require('./createDevToolsWindow')(store);
  }
});
