import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

const meta = ComposedComponent => {
  class Meta extends Component {
    render() {
      const { metaData, ...other } = this.props;
      const { title, link, meta } = metaData;
      return (
        <div>
          <Helmet title={title} link={link} meta={meta} />
          <ComposedComponent {...other} />
        </div>
      );
    }
  }

  Meta.propTypes = {
    meta: PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.array,
      meta: PropTypes.array
    })
  };

  return Meta;
}


export default meta;

