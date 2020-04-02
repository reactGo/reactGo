import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Page = ({
 title, link, meta, children,
}) => {
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      {children}
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.arrayOf(PropTypes.any),
  meta: PropTypes.arrayOf(PropTypes.any),
};

Page.defaultProps = {
  title: '',
  link: [],
  meta: [],
};

export default Page;
