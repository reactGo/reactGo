import React from 'react';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

const requireAuth = (Component) => {
  return class Authenticated extends React.Component {
    static willTransitionTo(transition, params, query, callback) {
      UserWebAPIUtils.loggedin().done((response) => {
        if (!response.authenticated) {
          transition.redirect('/login', {}, {'nextPath': transition.path});
        }
        callback();
      });
    }

    render() {
      return <Component {...this.props}/>;
    }
  };
};

export default requireAuth;
