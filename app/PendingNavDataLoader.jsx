import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import * as types from './types';
import fetchDataForRoute from './utils/fetchDataForRoute';

class PendingNavDataLoader extends Component {
  static propTypes = {
    children: PropTypes.objectOf(PropTypes.any).isRequired,
    routes: PropTypes.arrayOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    store: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  state = {
    previousLocation: null,
  };

  componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location;
    const { routes, store } = nextProps;

    if (navigated) {
      // save the location so we can render the old screen
      this.setState({
        previousLocation: this.props.location,
      });
      store.dispatch({ type: types.CREATE_REQUEST });
      fetchDataForRoute(matchRoutes(routes))
        .then((data) => {
          return store.dispatch({ type: types.REQUEST_SUCCESS, data });
        });
    }
  }

  render() {
    const { children, location } = this.props;
    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return (
      <Route
        location={location}
        render={() => children}
      />
    );
  }
}

export default withRouter(PendingNavDataLoader);
