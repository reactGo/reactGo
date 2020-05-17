import React, { Component } from 'react';
import { render } from 'react-dom';
import { matchRoutes } from 'react-router-config';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import StoreProvider from './Context';
import App from './pages/App';
import routes from './routes';

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
  <StoreProvider>
    <BrowserRouter>
      <PendingNavDataLoader routes={routes}>
        <App />
      </PendingNavDataLoader>
    </BrowserRouter>
  </StoreProvider>, document.getElementById('app'),
);
