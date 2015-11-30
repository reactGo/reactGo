import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';

export function requireAuthentication(Component) {
  class AuthenticateComponent extends React.Component {

    constructor(props) {
      super(props);
    }

    componentWillMount() {
      const { isAuthenticated, dispatch } = this.props;
      if (!isAuthenticated) {
        dispatch(updatePath(`/login?next=${this.props.location.pathname}`));
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
};
