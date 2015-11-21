import React from 'react';

const requireAuth = (Component) => {
  return class Authenticated extends React.Component {
    render() {
      return <Component {...this.props}/>;
    }
  };
};

export default requireAuth;
