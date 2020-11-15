import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import { RootState } from '../reducers';

import Page from './Page';
import LoginOrRegisterContainer from '../containers/LoginOrRegister';

const LoginOrRegister = () => {
  const { authenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  /*
   * Redirect to '/' if is already logged in.
   */
  useEffect(() => {
    if (authenticated) {
      dispatch(replace({ pathname: '/' }));
    }
  }, []);

  const pageTitle = () => {
    return 'LoginOrRegister | reactGo';
  };

  const pageMeta = () => {
    return [
      { name: 'description', content: 'A reactGo example of a login or register page' },
    ];
  };

  const pageLink = () => {
    return [];
  };

  const getMetaData = () => ({
    title: pageTitle(),
    meta: pageMeta(),
    link: pageLink(),
  });

  return (
    <Page {...getMetaData()}>
      <LoginOrRegisterContainer />
    </Page>
  );
};

export default LoginOrRegister;
