import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Dashboard = ({ user }) => {
  return (
    <div>
      <p>Welcome to the Dasboard, {user.profile.email || 'USER_EMAIL'}!</p>
      <p>(ID: {user.profile.id || 'USER_ID'})</p>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object
};

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps, {})(Dashboard);
