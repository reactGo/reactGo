import React from 'react';
import RequireAuth from 'utils/requireAuth';

export default RequireAuth(class Dashboard extends React.Component {
  render() {
    return (
      <div>Welcome to the Dashboard</div>
    );
  }
});
