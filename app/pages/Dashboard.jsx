import React, { useEffect } from 'react';
import { replace } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';

import Page from './Page';
import DashboardContainer from '../containers/Dashboard';

const Dashboard = (props) => {
  const { authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /*
   * Redirect to '/' if is not authenticated
   */
  useEffect(() => {
    if (!authenticated) {
      dispatch(replace({ pathname: '/' }));
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
