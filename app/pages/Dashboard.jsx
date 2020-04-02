import React from 'react';
import Page from './Page';
import DashboardContainer from '../containers/Dashboard';

const Dashboard = (props) => {
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
