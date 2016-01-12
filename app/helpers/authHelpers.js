import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushPath } from 'redux-simple-router';

export class NotAuthorizedException {
  constructor(to = '/login') {
    this.redirectTo = to;
  }
}

function requireAuth(nextState, replace) {
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });
}
/*
 * This uses a higher-order component to wrap our React Component and 
 * throws an Unauthorized error when the user is not authenticated.
 * Read more https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.s6vevwyut
 */
export function requireAuthentication(Component) {
  class AuthenticateComponent extends React.Component {
    componentWillMount() {
      const { isAuthenticated, dispatch } = this.props;
      console.log('dewwwd');
      if (!isAuthenticated) {
        if (typeof window !== 'undefined') {
          dispatch(pushPath(`/login?next=${this.props.location.pathname}`));
        } else {
          console.log('I was called');
          throw new NotAuthorizedException(`/login?next=${this.props.location.pathname}`);
        }
      }
    }

    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  AuthenticateComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object
  };

  function mapStateToProps(state) {
    return {
      token: state.user.token,
      isAuthenticated: state.user.authenticated
    };
  }

  return connect(mapStateToProps)(AuthenticateComponent);
}