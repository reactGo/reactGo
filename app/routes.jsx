import React from 'react';
import App from './pages/App';
import { fetchVoteData } from './fetch-data';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        }).catch(err => console.error(err));
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

export default [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    fetchData: fetchVoteData,
    component: asyncComponent(() => import(/* webpackChunkName: "Index" */ './pages/Vote')),
  }, {
    path: '/login',
    component: asyncComponent(() => import(/* webpackChunkName: "Login" */ './pages/LoginOrRegister')),
  }, {
    path: '/dashboard',
    component: asyncComponent(() => import(/* webpackChunkName: "Dashboard" */ './pages/Dashboard')),
  }, {
    path: '/about',
    component: asyncComponent(() => import(/* webpackChunkName: "About" */ './pages/About')),
  }],
}];
