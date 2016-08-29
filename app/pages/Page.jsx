import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

const Page = ({ metaData, children }) => {
  const { title, link, meta } = metaData;
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
};

Page.propTypes = {
  metaData: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.array,
    meta: PropTypes.array
  })
};

export default Page;

