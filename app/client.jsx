import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { matchRoutes } from 'react-router-config';
import { Route } from 'react-router';

import App from './pages/App';
import configureStore from './store/configureStore';
import routes from './routes';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const history = createBrowserHistory();
const store = configureStore(initialState, history);

/**
 * Callback function handling frontend route changes.
 */
class PendingNavDataLoader extends Component {
  state = {
    previousLocation: null,
    currentLocation: this.props.location,
  };

  static getDerivedStateFromProps(props, state) {
    const currentLocation = props.location;
    const previousLocation = state.currentLocation;

    const navigated = currentLocation !== previousLocation;
    if (navigated) {
      // save the location so we can render the old screen
      return {
        previousLocation,
        currentLocation,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    const navigated = prevProps.location !== this.props.location;

    if (navigated) {
      // load data while the old screen remains
      const branch = matchRoutes(routes, this.props.location);
      console.log('branch', branch);
      this.setState({
        previousLocation: null,
      });
    }
  }

  render() {
    const { children, location } = this.props;
    const { previousLocation } = this.state;

    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return (
      <Route location={previousLocation || location} render={() => children} />
    );
  }
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PendingNavDataLoader routes={routes}>
        <App />
      </PendingNavDataLoader>
    </ConnectedRouter>
  </Provider>, document.getElementById('app'),
);
