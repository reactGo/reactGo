import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useObserver } from 'mobx-react';

import { NavigationWrapper, Item, Logo } from '../css/components/navigation';
import useStore from '../useStore';

const LogOut = Item.withComponent<'button'>('button');

const Navigation = () => {
  const { userStore } = useStore();
  const history = useHistory();

  const dispatchLogOut = useCallback(() => {
    userStore.logOut();
    history.push('/');
  }, []);

  // activeClassName issues https://github.com/ReactTraining/react-router/issues/6201
  return useObserver(() => (
    <NavigationWrapper role="navigation">
      <Logo to="/" activeClassName="active">Ninja Ocean</Logo>
      {userStore.authenticated ? (
        <LogOut to="" onClick={dispatchLogOut}>Logout</LogOut>
      ) : (
        <Item to="/login" activeClassName="active">Log in</Item>
      )}
      <Item to="/dashboard" activeClassName="active">Dashboard</Item>
      <Item to="/about" activeClassName="active">About</Item>
    </NavigationWrapper>
  ));
};

export default Navigation;
