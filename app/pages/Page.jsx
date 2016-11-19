import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { meta as metaAssets, link as linkAssets, script as scriptAssets } from 'config/headAssets';

const Page = ({ title, link, meta, children }) => {
  const metaProp = meta || metaAssets;
  const linkProp = link || linkAssets;
  const scriptProp = script || scriptAssets;
  return (
    <div>
      <Helmet title={title} link={linkProp} meta={metaProp} script={scriptProp} />
      { children }
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
  meta: PropTypes.array
};

export default Page;

