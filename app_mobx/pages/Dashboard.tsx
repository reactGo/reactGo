import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import Page from './Page';
import DashboardContainer from '../containers/Dashboard';
import useStore from '../useStore';

const Dashboard = (props) => {
  const { userStore: { authenticated } } = useStore();
  const history = useHistory();
  /*
   * Redirect to '/' if is not authenticated
   */
  useEffect(() => {
    if (!authenticated) {
      history.replace('/');
    }
  }, []);

  const pageTitle = () => {
    return 'Dashboard | reactGo';
  };

  const pageMeta = () => {
    return [
      { name: 'description', content: 'A reactGo example of a dashboard page' },
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
      <DashboardContainer {...props} />
    </Page>
  );
};

export default Dashboard;
