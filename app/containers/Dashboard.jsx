import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class Dashboard extends Component {
  componentWillMount() {
    const { user: { authenticated }, history } = this.props;
    if (!authenticated) {
      history.replace('/login');
    }
  }

  render() {
    return <div>Welcome to the Dasboard. Stay tuned...</div>;
  }
}
Dashboard.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
};

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps)(Dashboard);
