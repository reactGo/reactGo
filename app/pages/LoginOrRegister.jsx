import React from 'react';
import Page from './Page';
import LoginOrRegisterContainer from '../containers/LoginOrRegister';

const LoginOrRegister = (props) => {
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
