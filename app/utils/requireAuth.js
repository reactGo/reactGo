import React from 'react';
import UserWebAPIUtils from 'utils/UserWebAPIUtils';

const requireAuth = (Component) => {
  return class Authenticated extends React.Component {
    static willTransitionTo(transition, params, query, callback) {
      if (typeof window !== 'undefined') {
        UserWebAPIUtils.loggedin().done((response) => {
          if (!response.authenticated) {
            transition.redirect('/login', {}, {'nextPath': transition.path});
          }
          callback();
        });
      } else {
        callback();
      }
    }

    render() {
      return <Component {...this.props}/>;
    }
  };
};

export default requireAuth;
