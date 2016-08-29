import React, { Component, PropTypes } from 'react';
import meta from 'pages/meta';
import Vote from 'containers/Vote';

const VoteWithMeta = meta(Vote);

class VotePage extends Component {
  render() {
    return (
      <VoteWithMeta {...this.props} metaData={this.getMetaData()} />
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
    return 'Vote | reactGo';
  }

  pageMeta() {
    return [
      { name: "description", content: "A reactGo example of a voting page" }
    ];
  }

  pageLink() {
    return [];
  }
}

export default VotePage;

