import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { NavigationWrapper, Item, Logo } from '../css/components/navigation';
import { logOut } from '../thunks/users';

const LogOut = Item.withComponent('button');

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const dispatchLogOut = useCallback(() => {
    dispatch(logOut());
    history.push('/');
  }, []);

  // activeClassName issues https://github.com/ReactTraining/react-router/issues/6201
  return (
    <NavigationWrapper role="navigation">
      <Logo to="/" activeClassName="active">Ninja Ocean</Logo>
      {user.authenticated ? (
        <LogOut onClick={dispatchLogOut}>Logout</LogOut>
      ) : (
        <Item to="/login" activeClassName="active">Log in</Item>
      )}
      <Item to="/dashboard" activeClassName="active">Dashboard</Item>
      <Item to="/about" activeClassName="active">About</Item>
    </NavigationWrapper>
  );
};

export default Navigation;
