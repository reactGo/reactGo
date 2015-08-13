import React from 'react';
import UserStore from 'stores/UserStore';


const requireAuth = (Component) => {
  return class Authenticated extends React.Component {
    render() {
      return <Component {...this.props}/>;
    }
  };
};

export default requireAuth;
