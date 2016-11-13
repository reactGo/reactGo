import React, { Component, PropTypes } from 'react';
import Page from 'pages/Page';
import AboutContainer from 'containers/About';

class About extends Component {
  render() {
    return (
      <Page {...this.getMetaData()}>
        <AboutContainer {...this.props} />
      </Page>
    );
  }

  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'About | reactGo';
  }

  pageMeta() {
    return [
      { name: "description", content: "A reactGo example of life" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default About;
