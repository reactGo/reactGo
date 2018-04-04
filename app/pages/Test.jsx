import React, { Component } from 'react';
import Page from '../pages/Page';
import TestContainer from '../containers/Test';
import { connect } from 'react-redux';

class Test extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Test | Lana';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Test page' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <TestContainer {...this.props} />
      </Page>
    );
  }
}

export default connect()(Test);
