import React, { FC } from 'react';
import Page from './Page';
import AboutContainer from '../containers/About';

const About: FC = () => {
  const pageTitle = () => {
    return 'About | reactGo';
  };

  const pageMeta = () => {
    return [
      { name: 'description', content: 'A reactGo example of life' },
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
      <AboutContainer />
    </Page>
  );
};

export default About;
