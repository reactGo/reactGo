import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {fetchVoteData} from './fetch-data';
import App from './pages/App';

const getLoginComponent     = (l, c) => require.ensure([], () => c(null, require('./pages/LoginOrRegister').default));
const getVoteComponent      = (l, c) => require.ensure([], () => c(null, require('./pages/Vote').default));
const getDashboardComponent = (l, c) => require.ensure([], () => c(null, require('./pages/Dashboard').default));
const getAboutComponent     = (l, c) => require.ensure([], () => c(null, require('./pages/About').default));

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
  
  return (
    <Route path="/" component={App}>
      <IndexRoute getComponent={getVoteComponent} fetchData={fetchVoteData} />
      <Route path="about" getComponent={getAboutComponent} />
      <Route path="dashboard" getComponent={getDashboardComponent} onEnter={requireAuth} />
      <Route path="login" getComponent={getLoginComponent} onEnter={redirectAuth} />
    </Route>
  );
};
