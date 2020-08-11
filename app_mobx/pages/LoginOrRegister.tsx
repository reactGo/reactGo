import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import Page from './Page';
import LoginOrRegisterContainer from '../containers/LoginOrRegister';
import useStore from '../useStore';

const LoginOrRegister = (props) => {
  const { userStore: { authenticated }} = useStore();
  const history = useHistory();
  /*
   * Redirect to '/' if is already logged in.
   */
  useEffect(() => {
    if (authenticated) {
      history.replace('/');
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
      <LoginOrRegisterContainer {...props} />
    </Page>
  );
};

export default LoginOrRegister;
