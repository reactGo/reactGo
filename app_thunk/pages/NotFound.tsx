import React from 'react';
import Page from './Page';

const About = () => {
  const pageTitle = () => {
    return '404 Not Found | reactGo';
  };

  const pageMeta = () => {
    return [
      { name: 'description', content: '404 Not Found' },
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
      <div>Oops, this page doesn&apos;t exist!</div>
    </Page>
  );
};

export default About;
