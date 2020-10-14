import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logOut } from '../actions/users';
import { NavigationWrapper, Item, Logo } from '../css/components/navigation';
import { RootState } from '../reducers';

const LogOut = Item.withComponent('button') as React.ElementType;

const Navigation = () => {
  const user = useSelector<RootState, RootState['user']>((state) => state.user);
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
