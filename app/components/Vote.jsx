import React from 'react';

import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';

import styles from 'scss/components/_vote';

export default class Vote extends React.Component {

  render() {
    return (
      <div className={styles.vote}>
        <EntryBox topic={this.props.TopicStore.newTopic} />
        <MainSection topics={this.props.TopicStore.topics} />
        <Scoreboard topics={this.props.TopicStore.topics} />
      </div>
    );
  }
}

Vote.propTypes = {
  TopicStore: React.PropTypes.object
};
