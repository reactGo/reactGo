import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchVoteData } from 'fetch-data';
import App from 'containers/App';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  const getVote = (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./pages/Vote').default);
    });
  };

  const getDashboard = (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./pages/Dashboard').default);
    });
  };

  const getLoginOrRegister = (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./pages/LoginOrRegister').default);
    });
  };

  const getAbout = (nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('./pages/About').default);
    });
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getVote} fetchData={fetchVoteData} />
      <Route path="login" getComponent={getLoginOrRegister} onEnter={redirectAuth} />
      <Route path="dashboard" getComponent={getDashboard} onEnter={requireAuth} />
      <Route path="about" getComponent={getAbout} />
    </Route>
  );
};
